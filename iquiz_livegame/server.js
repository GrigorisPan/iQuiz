// Import dependencies
const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const socketio = require('socket.io');
const helmet = require('helmet');
const cors = require('cors');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const https = require('https');
const fs = require('fs');
const path = require('path');
require('https').globalAgent.options.rejectUnauthorized = false;
//Import classes
const { LiveGames } = require('./utils/liveGames');
const { Players } = require('./utils/players');

const games = new LiveGames();
const players = new Players();
const badFillerArray = [
  'Τελικά ήταν μια δύσκολη ερώτηση.',
  'Σας δυσκόλεψε όλους αυτή η ερώτηση.',
  'Μάλλον ήθελε περισσότερη προσοχή η ερώτηση.',
  'Δεν πήγε καλά αυτή η ερώτηση.',
];
const goodFillerArray = [
  'Καλή προσπάθεια! Αλλά μπορείτε ακόμα καλύτερα.',
  'Μπράβο παιδιά!',
  'Φάνηκε να μην σας δυσκόλεψε πολύ αυτή η ερώτηση.',
  'Συνεχίστε την προσπάθεια. Τα πάτε πολύ καλά.',
];
const excellentFillerArray = [
  'Έχει αστέρια αυτή η τάξη.',
  'Εξαιρετική απόδοση!',
  'Είστε όλοι πολύ καλά διαβασμένοι.',
  'Τελικά αποδείχθηκε μια πολύ εύκολη ερώτηση.',
];

const generalFillerArray = [
  'Μην σταματάτε να μελετάτε!',
  'Για να δούμε πως θα τα πάτε σε αυτό το κουίζ.',
  'Βάλτε τα δυνατά σας να νικήσετε.',
  'Μείνετε συγκεντρωμένοι.',
];

const noAnswerFillerArray = [
  'Φαίνεται ότι κάποιοι ξεχάσαν να απαντήσουν!',
  'Αρκετοί δεν απάντησαν σε αυτήν την ερώτηση.',
  'Μπράβο! Σχεδόν όλοι δώσατε απάντηση.',
  'Συγχαρητήρια προλάβατε να απαντήσετε όλοι!',
];

// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

app.use(express.static(__dirname + '/public'));

const PORT = process.env.PORT || 8000;

//Local
//Cross-Origin-Embedder-Policy
//app.use(cors());
//Security Headers
//app.use(helmet());

//Production
app.set('trust proxy', true);

//Security Headers
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

// Enable CORS
//app.use(cors());
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:8000'],
  })
);

/* const sslServer = https.createServer({key:fs.readFileSync(path.join(__dirname, 'cert', 'cert.key')),cert:fs.readFileSync(path.join(__dirname, 'cert', 'cert.crt.pem')) },app) */

//Starting server on port 8000
const server = app.listen(PORT, '0.0.0.0', async () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}.`
  );
});

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);

  // Close server & exit process
  server.close(() => process.exit(1));
});

//Production
//When a connection to server is made from client
const io = require('socket.io')(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:8000'],
    methods: ['GET', 'POST'],
  },
});
//Local
//When a connection to server is made from client
//const io = socketio(server);

io.on('connection', (socket) => {
  //When host connects for the first time
  socket.on('host-join', async (data) => {
    /*  let gamePIN = 8888;*/
    let lsiUrl = `http://localhost:3000/login`;
    let gamePIN = Math.floor(Math.random() * 9000) + 1000; //new Pin for game
    let startGame = false;
    while (!startGame) {
      startGame = games.checkPinGame(gamePIN);
      if (!startGame) {
        gamePIN = Math.floor(Math.random() * 9000) + 1000; //new Pin for game
      }
    }

    games.addGame(
      gamePIN,
      socket.id,
      false,
      {
        playersAnswered: 0,
        questionLive: false,
        gameId: null,
        userId: data.userId,
        quizId: data.quizId,
        category: data.category,
        failQuota: data.failQuota,
        numFailQuota: data.numFailQuota,
        time: data.time,
        feedback: data.feedback,
        firstAns: false,
        countCorrect: 0,
        question: 1,
        questions: null,
      },
      [
        /* { ip: '127.0.0.1', date: Date.now() + 15 * 60 * 1000 } */
      ]
    );

    //Creates a game with pin and host id
    const game = games.getGame(socket.id); //Gets the game data

    socket.join(game.pin); //The host is joining a room based on the pin

    console.log('Game Created with pin:', game.pin);

    try {
      const config = {
        headers: {
          'Content-Type': 'text/html',
        },
        timeout: '2000',
      };

      const res = await axios.get(
        `https://lsi.gr/create.php?url=http://localhost:3000/login&key=<EDIT HERE>&hashsize=4&charset=1`,
        config
      );
      lsiUrl = res.data;
    } catch (error) {
      console.log('Get Lsi Url Error');
    }

    socket.emit('showGamePin', { pin: game.pin, lsiUrl });
  });

  //When the host connects from the game view
  socket.on('host-join-game', async (data) => {
    const oldHostId = data.id;
    const token = data.token;

    //JWT Verify Communication between back-end systems
    const systemToken = jwt.sign(
      { pass: process.env.SYSTEMS_COMM_PASS },
      process.env.JWT_SYSTEMS_COMM_SECRET,
      {
        expiresIn: process.env.JWT_SYSTEMS_COMM_EXPIRE,
      }
    );

    const game = games.getGame(oldHostId); // Gets game with old host id

    if (game) {
      let initializeGame = undefined;
      game.hostId = socket.id; //Change the game host id to new host id

      socket.join(game.pin);
      const playerData = players.getPlayers(oldHostId); //Gets player in game

      for (let i = 0; i < Object.keys(players.players).length; i++) {
        if (players.players[i].hostId == oldHostId) {
          players.players[i].hostId = socket.id;
        }
      }

      const quizId = game.gameData['quizId'];

      //Find and return quiz question's from db
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };

        const res = await axios.get(
          `${process.env.REACT_APP_URL_API}/api/v1/game/play/${quizId}`,
          config
        );

        const data = [];
        const leaders = ['', ''];

        //Check if we have fetch questions successfully
        if (res.data.success) {
          //initialize live game to db
          if (playerData.length > 0) {
            try {
              const config = {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${systemToken}`,
                },
              };

              const res = await axios.post(
                `${process.env.REACT_APP_URL_API}/api/v1/livegame/start`,
                {
                  user_id: game.gameData.userId,
                  quiz_id: game.gameData.quizId,
                  category: game.gameData.category,
                },
                config
              );
              initializeGame = res.data;
            } catch (error) {
              //HTTP request error
              socket.emit('noGameFound');
              console.log(error);
            }
          }
          //Live game start
          if (playerData.length === 0 || initializeGame.success) {
            game.gameData.questions = res.data.data.questions.question;
            data.push(res.data.data.questions.question[0]);
            game.gameData.gameId = initializeGame
              ? initializeGame.gameId
              : null;
            const questionNum = game.gameData.question;
            const questionsLength = game.gameData.questions.length;
            socket.emit('gameQuestions', {
              data,
              playersInGame: playerData.length,
              questionNum,
              questionsLength,
              leaders,
            });
            io.to(game.pin).emit('gameStartedPlayer');
            game.gameData.questionLive = true;
          }
        } else {
          //Fetch questions error

          socket.emit('noGameFound');
        }
      } catch (err) {
        //HTTP request error
        console.log(`Fetch questions error ${err}`);
        socket.emit('noGameFound');
      }
      //No game was found, redirect
    } else socket.emit('noGameFound');
  });

  //When player connects for the first time
  socket.on('player-join', (params) => {
    let gameFound = false; //If game is found with pin provider by player
    let banPlayer = false;

    //For each game in the Games class
    for (let i = 0; i < games.games.length; i++) {
      //If the pin is equal to one of the game's pin
      if (params.pin == games.games[i].pin) {
        const hostId = games.games[i].hostId; //Get the id of host of game
        const clientIp = socket.request.connection.remoteAddress;

        if (games.games[i].banData.length !== 0) {
          games.games[i].banData.forEach((data) => {
            if (data.ip == clientIp && data.date > Date.now()) {
              banPlayer = true;
              console.log('Ban Player', clientIp);
            }
          });
        }
        if (games.games[i].gameLive) {
          socket.emit('noGameFound'); //Player is sent back to 'join' page because game was not found with pin
        }
        if (!banPlayer && games.games[i].gameLive === false) {
          console.log('Player connected to game');

          players.addPlayer(
            hostId,
            socket.id,
            /* socket.handshake.headers['x-forwarded-for'] ||
              socket.handshake.address */
            clientIp,
            params.name,
            {
              score: 0,
              answer: '',
              correctAns: 0,
              falseAns: 0,
              playerFirstAns: 0,
              ansFlag: null,
              enable: true,
            },
            {}
          );
          //add player to game
          socket.join(params.pin); //Player is joining room based pin
          socket.emit('successPlayerJoin');
          const playersInGame = players.getPlayers(hostId); //Getting all players in game

          io.to(params.pin).emit('updatePlayerLobby', playersInGame); //Sending host player data to display
          gameFound = true; //Game has been found
        }
      }
    } //If the game has not been found
    if (gameFound == false) {
      socket.emit('noGameFound'); //Player is sent back to 'join' page because game was not found with pin
    }
  });

  //When the player connects from game view
  socket.on('player-join-game', (data) => {
    const player = players.getPlayer(data.id);

    if (player) {
      const game = games.getGame(player.hostId);
      socket.join(game.pin);
      player.playerId = socket.id; //Update player id with socket id
      const playerData = players.getPlayers(game.hostId);
      socket.emit('playerGameData', playerData);
    } else {
      socket.emit('noGameFound'); //No player found
    }
  });

  socket.on('disconnect', () => {
    const game = games.getGame(socket.id); //Finding game with socket id

    //If a game hosted by that id is found, the socket disconnected is a host

    if (game) {
      //Checking to see if host was disconnect or was sent to game view

      games.removeGame(socket.id); // Remove the game from games class
      console.log('Game ended with pin:', game.pin);

      const playersToRemove = players.getPlayers(game.hostId); //Getting all players in the game

      //For each player in the game
      for (let i = 0; i < playersToRemove.length; i++) {
        players.removePlayer(playersToRemove[i].playerId); //Removing each player from player class
      }

      io.to(game.pin).emit('hostDisconnect'); //Send player back to 'join' screen
      console.log('Host Disconnect');
      socket.leave(game.pin); //Socket is leaving room
    } else {
      //No game has been found, so it is a player socket that has disconnected
      const player = players.getPlayer(socket.id); // Getting player with socket.id

      //If a player has been found with that id
      if (player) {
        const hostId = player.hostId; //Gets id of host of the game

        const game = games.getGame(hostId); //Gets game data with hostId

        const pin = game.pin; //Gets the pin of the game;

        if (game.gameLive == false) {
          players.removePlayer(socket.id); //Removes player from players class

          const playersInGame = players.getPlayers(hostId); //Gets remainig players in game

          io.to(pin).emit('updatePlayerLobby', playersInGame); //Sends data to host to update screen
          console.log('User disconnect');
          socket.leave(pin); //Player is leaving the room
        } else {
          socket.leave(pin);
        }
      }
    }
  });

  socket.on('player-kick', (params) => {
    const playerId = params.id;
    //No game has been found, so it is a player socket that has disconnected
    const player = players.getPlayer(playerId); // Getting player with socket.id

    //If a player has been found with that id
    if (player) {
      const hostId = player.hostId; //Gets id of host of the game

      const game = games.getGame(hostId); //Gets game data with hostId

      const pin = game.pin; //Gets the pin of the game;

      if (game.gameLive == false) {
        players.removePlayer(playerId); //Removes player from players class

        //Find player's socket
        let clientSocket = [];
        socket.nsp.sockets.forEach((socket) => {
          if (socket.id === playerId) {
            clientSocket.push(socket);
          }
        });
        const playersInGame = players.getPlayers(hostId); //Gets remainig players in game

        clientSocket[0].emit('kickPlayer'); //Player is sent back to 'join' page because host kick player
        clientSocket[0].leave(pin); //Player is leaving the room
        clientSocket[0].disconnect(true); //Player is disconnecting from server
        io.to(pin).emit('updatePlayerLobby', playersInGame); //Sends data to host to update screen
      }
    }
  });

  socket.on('player-ban', (params) => {
    const playerId = params.id;
    //No game has been found, so it is a player socket that has disconnected
    const player = players.getPlayer(playerId); // Getting player with socket.id

    //If a player has been found with that id
    if (player) {
      const hostId = player.hostId; //Gets id of host of the game

      const game = games.getGame(hostId); //Gets game data with hostId

      const pin = game.pin; //Gets the pin of the game;

      if (game.gameLive == false) {
        games.addBanData(game, {
          ip: player.playerIp,
          date: Date.now() + 15 * 60 * 1000,
        });

        //console.log(games.getGame(hostId));
        players.removePlayer(playerId); //Removes player from players class

        //Find player's socket
        let clientSocket = [];
        socket.nsp.sockets.forEach((socket) => {
          if (socket.id === playerId) {
            clientSocket.push(socket);
          }
        });
        const playersInGame = players.getPlayers(hostId); //Gets remainig players in game

        clientSocket[0].emit('banPlayer'); //Player is sent back to 'join' page because host ban player's ip
        clientSocket[0].leave(pin); //Player is leaving the room
        clientSocket[0].disconnect(true); //Player is disconnecting from server
        io.to(pin).emit('updatePlayerLobby', playersInGame); //Sends data to host to update screen
      }
    }
  });

  //When the host starts the game
  socket.on('startGame', () => {
    const game = games.getGame(socket.id); //Get the game based on socket.id
    game.gameLive = true;
    socket.emit('getStarted', game.hostId); //Tell player and host that game has started
  });

  socket.on('nextQuestion', function () {
    let byScore;
    const playerData = players.getPlayers(socket.id);

    //JWT Verify Communication between back-end systems
    const systemToken = jwt.sign(
      { pass: process.env.SYSTEMS_COMM_PASS },
      process.env.JWT_SYSTEMS_COMM_SECRET,
      {
        expiresIn: process.env.JWT_SYSTEMS_COMM_EXPIRE,
      }
    );

    //Reset players current answer to 0
    for (let i = 0; i < Object.keys(players.players).length; i++) {
      if (players.players[i].hostId == socket.id) {
        players.players[i].gameData.answer = 0;
        players.players[i].gameData.playerFirstAns = 0;
        players.players[i].gameData.ansFlag = null;
      }
    }
    const game = games.getGame(socket.id);

    //Reset game's data
    game.gameData.playersAnswered = 0;
    game.gameData.countCorrect = 0;
    game.gameData.firstAns = false;
    game.gameData.questionLive = true;
    game.gameData.question += 1;

    //the game continues
    if (game.gameData.questions.length >= game.gameData.question) {
      const data = [];
      const questionsLength = game.gameData.questions.length;
      const questionNum = game.gameData.question;
      data.push(game.gameData.questions[questionNum - 1]);

      const playersInGame = players.getPlayers(game.hostId);
      byScore = playersInGame.slice(0);
      byScore.sort(function (a, b) {
        return b.gameData.score - a.gameData.score;
      });
      const leaders = [];
      byScore[0] ? leaders.push(byScore[0].name) : leaders.push('');
      byScore[1] ? leaders.push(byScore[1].name) : leaders.push('');
      socket.emit('gameQuestions', {
        data,
        playersInGame: playerData.length,
        questionNum,
        questionsLength,
        leaders,
      });
    } else {
      //the game is over
      const playersInGame = players.getPlayers(game.hostId);
      byScore = playersInGame.slice(0);
      byScore.sort(function (a, b) {
        return b.gameData.score - a.gameData.score;
      });
      //console.log(byScore);
      io.to(game.pin).emit('GameOver', byScore);
      game.gameLive = false;
    }

    if (game.gameData.gameId) {
      console.log('Save players statistics ');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${systemToken}`,
        },
      };

      axios.post(
        `${process.env.REACT_APP_URL_API}/api/v1/livegame/save`,
        { game_id: game.gameData.gameId, leaderboard: byScore },
        config
      );
    }

    io.to(game.pin).emit('nextQuestionPlayer');
  });

  socket.on('hostEndGame', () => {
    const game = games.getGame(socket.id);
    const playersInGame = players.getPlayers(game.hostId);
    var byScore = playersInGame.slice(0);
    byScore.sort(function (a, b) {
      return b.gameData.score - a.gameData.score;
    });

    io.to(game.pin).emit('GameOver', byScore);
    game.gameLive = false;
  });

  socket.on('playerAnswer', function (choice) {
    const player = players.getPlayer(socket.id);
    const hostId = player.hostId;
    const playersAll = players.getPlayers(hostId);
    const game = games.getGame(hostId);

    //If the question is still live
    if (game.gameData.questionLive == true) {
      player.previousGameData = JSON.parse(JSON.stringify(player.gameData));
      player.gameData.answer = choice;
      game.gameData.playersAnswered += 1;

      const questionNum = game.gameData.question;
      const correctAnswer = game.gameData.questions[questionNum - 1].correct;

      //Checks player's answer is correct
      if (choice == correctAnswer) {
        game.gameData.countCorrect += 1;
        player.gameData.correctAns += 1;
        player.gameData.ansFlag = 1;

        //Checks player's answer is first
        if (game.gameData.firstAns == false) {
          game.gameData.firstAns = true;
          player.gameData.playerFirstAns = 1;
        }
        //Send answer result
        socket.emit('answerResult', true);
        //Checks player's answer is false
      } else {
        //Checks player's answer is first
        if (game.gameData.firstAns == false) {
          game.gameData.firstAns = true;
          player.gameData.playerFirstAns = 1;
        }

        player.gameData.falseAns += 1;
        player.gameData.ansFlag = 0;
        if (game.gameData.failQuota) {
          if (game.gameData.numFailQuota < player.gameData.falseAns) {
            player.gameData.enable = false;
          }
        }
      }
      const ansFlag = player.gameData.ansFlag;
      io.to(game.pin).emit('getTime', { playerId: socket.id, ansFlag });

      //Check if all players answered
      if (game.gameData.playersAnswered == playersAll.length) {
        const questionOverData = { chartBars: [], fillerSlideFeedback: null };
        game.gameData.questionLive = false; // Question has been ended when all players answered under time
        const playerData = players.getPlayers(game.hostId); //Get All Player's Data
        const playersDataEnable = players.getEnablePlayers(game.hostId); //Get Enable Player's Data

        calculatorStatistics(game, playersDataEnable, questionOverData);

        const fillerSlideFeedback = questionOverData.fillerSlideFeedback;
        const chartBars = [...questionOverData.chartBars];
        const feedback = game.gameData.feedback;

        //Tell everyone that question is over
        io.to(game.pin).emit('questionOver', {
          playerData,
          feedback,
          fillerSlideFeedback,
          chartBars,
        });
      } else {
        //update host screen of num players answered
        io.to(game.pin).emit('updatePlayersAnswered', {
          playersInGame: playersAll.length,
          playersAnswered: game.gameData.playersAnswered,
        });
      }
    }
  });

  //This function calculate Chart Bars & FillerSlide
  const calculatorStatistics = (game, playersDataEnable, questionOverData) => {
    let answerA = 0;
    let answerB = 0;
    let answerC = 0;
    let answerD = 0;
    let answerE = 0;
    let counter = 0;
    let noAnswerCount = 0;
    const playersDataEnableLength = playersDataEnable.length;

    //General Fillers tables must be the same size
    const maxGeneralFiller = 3;
    const minGeneralFiller = 0;
    const maxPersonalFiller = 8;
    const minPersonalFiller = 1;

    //Random Choice General Filler Slide
    const randomNum = Math.round(
      Math.random() * Math.abs(maxGeneralFiller - minGeneralFiller) +
        minGeneralFiller
    );

    //Random type of Filler Slide
    //0: Personal Filler - 1: General Filler - 2: No Answer Filler
    const randomChoiceFiller = Math.round(Math.random() * Math.abs(2 - 0) + 0);

    //Random Choice Personal Filler Slide
    const randomPersonalFiller = Math.round(
      Math.random() * Math.abs(maxPersonalFiller - minPersonalFiller) +
        minPersonalFiller
    );

    if (playersDataEnableLength > 0) {
      //Chart Bars & Count Players No Answer
      for (let i = 0; i < playersDataEnableLength; i++) {
        if (playersDataEnable[i].gameData.answer == 'A') {
          answerA += 1;
        } else if (playersDataEnable[i].gameData.answer == 'B') {
          answerB += 1;
        } else if (playersDataEnable[i].gameData.answer == 'C') {
          answerC += 1;
        } else if (playersDataEnable[i].gameData.answer == 'D') {
          answerD += 1;
        } else if (playersDataEnable[i].gameData.answer == 'E') {
          answerE += 1;
        }
        if (playersDataEnable[i].gameData.ansFlag === null) {
          noAnswerCount += 1;
        }
      }

      //No Answer Rate Calculate From Enable Players
      const noAnswerRate = (noAnswerCount / playersDataEnableLength) * 100;

      //Correct Rate Calculate From Enable Players
      const rateCorrect =
        (game.gameData.countCorrect / playersDataEnableLength) * 100;

      //Gets values for graph
      answerA = 300 - (answerA / playersDataEnableLength) * 100;
      questionOverData.chartBars[0] = answerA >= 0 ? answerA : 0;
      answerB = 300 - (answerB / playersDataEnableLength) * 100;
      questionOverData.chartBars[1] = answerB >= 0 ? answerB : 0;
      answerC = 300 - (answerC / playersDataEnableLength) * 100;
      questionOverData.chartBars[2] = answerC >= 0 ? answerC : 0;
      answerD = 300 - (answerD / playersDataEnableLength) * 100;
      questionOverData.chartBars[3] = answerD >= 0 ? answerD : 0;
      answerE = 300 - (answerE / playersDataEnableLength) * 100;
      questionOverData.chartBars[4] = answerE >= 0 ? answerE : 0;

      //Personal FillerSlides
      if (randomChoiceFiller === 0) {
        while (counter < playersDataEnableLength) {
          // Returns a random integer from counter to (playersDataEnableLength - 1)
          let playerIndex = Math.floor(
            Math.random() * Math.abs(playersDataEnableLength - counter) +
              counter
          );

          if (
            randomPersonalFiller === 1 &&
            playersDataEnable[playerIndex].gameData.playerFirstAns === 1
          ) {
            questionOverData.fillerSlideFeedback = `<p>Ο χρήστης <span style="color:#ff7d1c;">${playersDataEnable[playerIndex].name}</span> απάντησε πρώτος.</p>`;
            // questionOverData.fillerSlideFeedback = `<div><p>Ο χρήστης <span style="color:#ff7d1c;">${playersDataEnable[playerIndex].name}</span> απάντησε πρώτος.</p><img src="https://picsum.photos/200/100" alt="Italian Trulli"></div>`;
            // questionOverData.fillerSlideFeedback = `<div><p>Ο χρήστης <span style="color:#ff7d1c;">${playersDataEnable[playerIndex].name}</span> απάντησε πρώτος.</p><iframe width="420" height="315"src="https://www.youtube.com/embed/1x246k6sJbM"></iframe></div>`;
            //questionOverData.fillerSlideFeedback = `<div><p>Ο χρήστης <span style="color:#ff7d1c;">${playersDataEnable[playerIndex].name}</span> απάντησε πρώτος.</p><img src="https://media.giphy.com/media/CnGxHh2F2ko7CdxR1F/giphy.gif" width="250"  alt="Html Gif"></div>`;
            break;
          }
          if (
            randomPersonalFiller === 2 &&
            playersDataEnable[playerIndex].gameData.ansFlag === 1 &&
            playersDataEnable[playerIndex].gameData.correctAns === 1
          ) {
            questionOverData.fillerSlideFeedback = `<p>Ο χρήστης <span style="color:#ff7d1c;">${playersDataEnable[playerIndex].name}</span> έκανε την πρώτη του σωστή απάντηση.</p>`;
            break;
          }
          if (
            randomPersonalFiller === 3 &&
            playersDataEnable[playerIndex].gameData.ansFlag === 0 &&
            playersDataEnable[playerIndex].gameData.falseAns === 1
          ) {
            questionOverData.fillerSlideFeedback = `<p>Ο χρήστης <span style="color:#ff7d1c;">${playersDataEnable[playerIndex].name}</span> έδωσε την πρώτη του λανθασμένη απάντηση.</p>`;
            break;
          }
          if (
            randomPersonalFiller === 4 &&
            playersDataEnable[playerIndex].gameData.ansFlag === 1 &&
            playersDataEnable[playerIndex].gameData.falseAns === 0
          ) {
            questionOverData.fillerSlideFeedback = `<p>Ο χρήστης <span style="color:#ff7d1c;">${playersDataEnable[playerIndex].name}</span> δεν έχει κάνει κανένα λάθος.</p>`;
            break;
          }
          if (
            randomPersonalFiller === 5 &&
            playersDataEnable[playerIndex].gameData.ansFlag === 0
          ) {
            questionOverData.fillerSlideFeedback = `<p>Ο χρήστης <span style="color:#ff7d1c;">${playersDataEnable[playerIndex].name}</span> απάντησε λάθος σε αυτή την ερώτηση.</p>`;
            break;
          }
          if (
            randomPersonalFiller === 6 &&
            playersDataEnable[playerIndex].gameData.ansFlag === 1
          ) {
            questionOverData.fillerSlideFeedback = `<p>Ο χρήστης <span style="color:#ff7d1c;">${playersDataEnable[playerIndex].name}</span> απάντησε σωστά σε αυτή την ερώτηση.</p>`;
            break;
          }
          if (
            randomPersonalFiller === 7 &&
            Object.keys(playersDataEnable[playerIndex].previousGameData)
              .length === 0
          ) {
            questionOverData.fillerSlideFeedback = `<p>Ο χρήστης <span style="color:#ff7d1c;">${playersDataEnable[playerIndex].name}</span> δεν έχει δώσει καμία απάντηση.</p>`;
            break;
          }
          if (
            randomPersonalFiller === 8 &&
            playersDataEnable[playerIndex].gameData.ansFlag === null
          ) {
            questionOverData.fillerSlideFeedback = `<p>Ο χρήστης <span style="color:#ff7d1c;">${playersDataEnable[playerIndex].name}</span> δεν απάντησε αυτή την ερώτηση.</p>`;
            break;
          }
          counter++;
        }
      }

      //General FillerSlides
      if (randomChoiceFiller === 1) {
        if (rateCorrect < 50) {
          questionOverData.fillerSlideFeedback = badFillerArray[randomNum];
        } else if (rateCorrect >= 50 && rateCorrect < 80) {
          questionOverData.fillerSlideFeedback = goodFillerArray[randomNum];
        } else {
          questionOverData.fillerSlideFeedback =
            excellentFillerArray[randomNum];
        }
      }
      //No Answer FillerSlides
      if (randomChoiceFiller === 2) {
        if (noAnswerRate === 0) {
          questionOverData.fillerSlideFeedback = noAnswerFillerArray[3]; //Συγχαρητήρια προλάβατε να απαντήσετε όλοι!
        } else if (noAnswerRate <= 20) {
          questionOverData.fillerSlideFeedback = noAnswerFillerArray[2]; //Μπράβο! Σχεδόν όλοι δώσατε απάντηση.
        } else if (noAnswerRate > 20 && noAnswerRate <= 50) {
          questionOverData.fillerSlideFeedback = noAnswerFillerArray[0]; //Φαίνεται ότι κάποιοι ξεχάσαν να απαντήσουν.
        } else if (noAnswerRate > 50) {
          questionOverData.fillerSlideFeedback = noAnswerFillerArray[1]; //Αρκετοί δεν απάντησαν σε αυτήν την ερώτηση.
        }
      }
      //General FillerSlides No Statistics
      if (questionOverData.fillerSlideFeedback === null) {
        questionOverData.fillerSlideFeedback = generalFillerArray[randomNum];
      }
    }
  };

  socket.on('time', function (data) {
    const game = games.getGame(socket.id);
    const playerId = data.playerId;
    const player = players.getPlayer(playerId);
    const ansFlag = data.ansFlag;
    const ansTime = data.time.current;

    //Find player's socket
    let clientSocket = [];
    socket.nsp.sockets.forEach((socket) => {
      if (socket.id === playerId) {
        clientSocket.push(socket);
      }
    });

    if (game.gameData.category == 1) {
      pointSystemCalc(game, player, ansTime, ansFlag);
    } else if (game.gameData.category == 2) {
      pointSystemNPCalc(game, player, ansTime, ansFlag);
    } else if (game.gameData.category == 3) {
      simpleGameCalc(game, player, ansFlag, clientSocket);
    } else if (game.gameData.category == 4) {
      simpleGameNPCalc(game, player, ansFlag, clientSocket);
    } else if (game.gameData.category == 5) {
      buzzerModeCalc(game, player, ansFlag, clientSocket);
    }
  });

  socket.on('timeUp', function () {
    const game = games.getGame(socket.id);
    game.gameData.questionLive = false;
    const playerData = players.getPlayers(game.hostId);
    const questionOverData = { chartBars: [], fillerSlideFeedback: null };
    if (game.gameData.firstAns) {
      const playersDataEnable = players.getEnablePlayers(game.hostId);
      calculatorStatistics(game, playersDataEnable, questionOverData);
    }

    const feedback = game.gameData.feedback;
    const fillerSlideFeedback = questionOverData.fillerSlideFeedback;
    const chartBars = [...questionOverData.chartBars];

    io.to(game.pin).emit('questionOver', {
      playerData,
      feedback,
      fillerSlideFeedback,
      chartBars,
    });
  });

  socket.on('liveGame-leaderboard', function (data) {
    const game = games.getGame(data);

    if (game) {
      const playersInGame = players.getPlayers(game.hostId);
      const byScore = playersInGame.slice(0);
      byScore.sort(function (a, b) {
        return b.gameData.score - a.gameData.score;
      });
      socket.emit('live-score', byScore);
    } else {
      socket.emit('noGameFound');
    }
  });
});

//Calculate Score for Point System game mode
const pointSystemCalc = (game, player, ansTime, ansFlag) => {
  if (ansFlag === 1) {
    let time = ansTime / game.gameData.time;
    const score = time * 100;
    player.gameData.score += score;
  } else {
    const time = ansTime / game.gameData.time;
    const correctScore = time * 100;
    let score = -((1 / 4) * correctScore);
    player.gameData.score += score;
  }
};

//Calculate Score for Point System - No Penalty game mode
const pointSystemNPCalc = (game, player, ansTime, ansFlag) => {
  if (ansFlag === 1) {
    let time = ansTime / game.gameData.time;
    const score = time * 100;
    player.gameData.score += score;
  }
};

//Calculate Score for Simple Game - No Penalty game mode
const simpleGameCalc = (game, player, ansFlag, clientSocket) => {
  if (ansFlag === 1) {
    player.gameData.score += 1;
  } else {
    if (game.gameData.failQuota) {
      if (game.gameData.numFailQuota >= player.gameData.falseAns) {
        player.gameData.score -= 1;
      } else {
        clientSocket[0].emit('playerDisable');
      }
    } else {
      player.gameData.score -= 1;
    }
  }
};

//Calculate Score for Simple Game - No Penalty game mode
const simpleGameNPCalc = (game, player, ansFlag, clientSocket) => {
  if (ansFlag === 1) {
    player.gameData.score += 1;
  } else {
    if (game.gameData.failQuota) {
      if (game.gameData.numFailQuota < player.gameData.falseAns) {
        clientSocket[0].emit('playerDisable');
      }
    }
  }
};

const buzzerModeCalc = (game, player, ansFlag, clientSocket) => {
  if (player.gameData.playerFirstAns) {
    if (ansFlag === 1) {
      player.gameData.score += 1;
    } else {
      if (game.gameData.failQuota) {
        if (game.gameData.numFailQuota < player.gameData.falseAns) {
          clientSocket[0].emit('playerDisable');
        }
      }
    }
  }
};
