import {
  CORRECT_ANSWER,
  ENTRANCE_CLIENT_LIVE_GAME,
  FEEDBACK_ANSWER,
  GET_STARTED,
  PLAYER_ANSWER_QUESTION,
  PLAYER_DISABLE,
  PLAYER_JOIN_FAIL,
  PLAYER_JOIN_GAME_FAIL,
  PLAYER_JOIN_GAME_REQUEST,
  PLAYER_JOIN_GAME_SUCCESS,
  PLAYER_JOIN_REQUEST,
  PLAYER_JOIN_RESET,
  PLAYER_JOIN_SUCCESS,
  SET_PLAYER,
  TIME_UP,
  WAITING_CLIENT_LIVE_GAME,
} from '../constants/liveGameConstants';

//<==========================ClientEntranceGame==========================>
export const clientLiveGame = () => (dispatch) => {
  dispatch({ type: ENTRANCE_CLIENT_LIVE_GAME });
};

export const clientEntryGame = (body) => (dispatch) => {
  dispatch({ type: SET_PLAYER, payload: body });
  dispatch({ type: WAITING_CLIENT_LIVE_GAME });
};

export const playerJoin = (socket) => (dispatch, getState) => {
  dispatch({ type: PLAYER_JOIN_REQUEST });

  const {
    liveGameClient: { playerInfo },
  } = getState();

  const params = { name: playerInfo.nickname, pin: +playerInfo.pin };
  //When client connects server
  socket.on('connect', function () {
    //Tell server that it is player connection
    socket.emit('player-join', params);
  });
  //client connect is success
  socket.on('successPlayerJoin', () => {
    dispatch({
      type: PLAYER_JOIN_SUCCESS,
      payload: socket.id,
    });
  });
  //Error connection with server
  socket.on('connect_error', (err) => {
    dispatch({
      type: PLAYER_JOIN_FAIL,
      payload: 'Σφάλμα',
    });
  });
  //Boot player back to join screen if game pin has no match
  socket.on('noGameFound', () => {
    dispatch({
      type: PLAYER_JOIN_FAIL,
      payload: 'Δεν βρέθηκε το παιχνίδι',
    });
  });

  //If the host ban player for 15mins, then the player is booted to main screen
  socket.on('banPlayer', () => {
    dispatch({
      type: PLAYER_JOIN_FAIL,
      payload: `Απαγόρευση εισόδου για 15 λεπτά`,
    });
  });

  //If the host kick player from the game, then the player is booted to main screen
  socket.on('kickPlayer', () => {
    dispatch({
      type: PLAYER_JOIN_FAIL,
      payload: `Ο καθηγητής σας έχει αφαιρέσει από το παιχνίδι`,
    });
  });
  //When the host clicks start game, the player screen changes
  socket.on('gameStartedPlayer', (data) => {
    dispatch({
      type: GET_STARTED,
    });
  });

  //If the host disconnects, then the player is booted to main screen
  socket.on('hostDisconnect', function () {
    dispatch({
      type: PLAYER_JOIN_FAIL,
      payload: `Ο καθηγητής έχει αποσυνδεθεί`,
    });
  });
};

export const playerJoinReset = (socket) => (dispatch) => {
  socket.disconnect();
  dispatch({ type: PLAYER_JOIN_RESET });
  dispatch({ type: ENTRANCE_CLIENT_LIVE_GAME });
};

export const exitGame = (socket) => (dispatch) => {
  socket.disconnect();
  dispatch({ type: ENTRANCE_CLIENT_LIVE_GAME });
  window.location.href = '/';
};

export const playerJoinGame = (socket) => (dispatch, getState) => {
  dispatch({ type: PLAYER_JOIN_GAME_REQUEST });

  const {
    liveGameClient: { playerId },
  } = getState();

  const data = { id: playerId };

  //When client connects server
  socket.on('connect', function () {
    //Tell server that it is player connection
    socket.emit('player-join-game', data);
  });

  //client connect is success
  socket.on('playerGameData', (playerData) => {
    if (playerData) {
      dispatch({
        type: PLAYER_JOIN_GAME_SUCCESS,
        payload: playerData,
      });
    } else {
      dispatch({
        type: PLAYER_JOIN_GAME_FAIL,
        payload: 'Σφάλμα',
      });
    }
  });

  //Error connection with server
  socket.on('connect_error', (err) => {
    dispatch({
      type: PLAYER_JOIN_GAME_FAIL,
      payload: 'Σφάλμα',
    });
  });
  //Boot player back to join screen if game pin has no match
  socket.on('noGameFound', () => {
    dispatch({
      type: PLAYER_JOIN_GAME_FAIL,
      payload: 'Δεν βρέθηκε το παιχνίδι',
    });
  });

  //If the host disconnects, then the player is booted to main screen
  socket.on('hostDisconnect', function () {
    socket.disconnect();
    dispatch({
      type: PLAYER_JOIN_GAME_FAIL,
      payload: `Ο καθηγητής έχει αποσυνδεθεί`,
    });
    window.location.href = '/livegame/landing';
  });

  socket.on('questionOver', function (data) {
    const {
      liveGameClient: { playerAnswered },
    } = getState();
    if (playerAnswered === false) {
      dispatch({ type: TIME_UP, payload: true });
    } else {
      if (data.feedback === true) {
        dispatch({ type: FEEDBACK_ANSWER, payload: true });
      } else {
        dispatch({ type: FEEDBACK_ANSWER, payload: false });
      }
    }
  });

  socket.on('nextQuestionPlayer', function () {
    dispatch({ type: TIME_UP, payload: false });
    dispatch({ type: FEEDBACK_ANSWER, payload: false });
    dispatch({ type: PLAYER_ANSWER_QUESTION, payload: false });
    dispatch({ type: CORRECT_ANSWER, payload: false });
  });

  socket.on('playerDisable', function () {
    dispatch({ type: PLAYER_DISABLE });
  });

  socket.on('GameOver', () => {
    socket.disconnect();
    dispatch({ type: ENTRANCE_CLIENT_LIVE_GAME });
    dispatch({ type: PLAYER_JOIN_RESET });
  });
};

export const playerAnswer = (socket, choice) => (dispatch, getState) => {
  dispatch({ type: PLAYER_ANSWER_QUESTION, payload: true });

  socket.emit('playerAnswer', choice); //Sends player answer to server

  //Get results on last question
  socket.on('answerResult', function (data) {
    if (data === true) {
      dispatch({ type: CORRECT_ANSWER, payload: true });
    }
  });
};
