const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Quiz = require('../models/Quiz');
const Users = require('../models/User');
const Sequelize = require('sequelize');
const LiveGame = require('../models/LiveGame');
const StatisticsLiveGame = require('../models/StatisticsLiveGame');

//  @desc     Get live games
//  @route    GET /api/v1/livegame
//  @access   Private  (Teacher + Admin)
exports.getLiveGames = asyncHandler(async (req, res, next) => {
  const type = +req.user.type;
  const id = +req.user.id;

  if (type === 2) {
    //Teacher
    const liveGames = await LiveGame.findAll({
      where: [{ user_id: id }],
      include: [{ model: Quiz, attributes: ['title'] }],
    });
    res
      .status(200)
      .json({ success: true, count: liveGames.length, data: liveGames });
  } else if (type === 1) {
    //Admin
    const liveGames = await LiveGame.findAll({
      include: [
        { model: Users, attributes: ['username'] },
        { model: Quiz, attributes: ['title'] },
      ],
    });
    res
      .status(200)
      .json({ success: true, count: liveGames.length, data: liveGames });
  } else {
    return next(new ErrorResponse(`Ο χρήστης δεν έχει δικαίωμα`, 401));
  }
});

//  @desc     Get live game statistics
//  @route    GET /api/v1/livegame/statistics/:game_id
//  @access   Private  (Teacher + Admin)
exports.getLiveGameStatistics = asyncHandler(async (req, res, next) => {
  const type = +req.user.type;
  const id = +req.params.id;

  if (type === 2) {
    //Teacher
    const statisticsLiveGame = await StatisticsLiveGame.findAll({
      where: [{ game_id: id }],
      order: [['score', 'DESC']],
      attributes: {
        exclude: ['game_id', 'player_id', 'createdAt', 'updatedAt'],
      },
    });
    if (statisticsLiveGame.length === 0 || !statisticsLiveGame) {
      return next(
        new ErrorResponse(
          `Δεν βρέθηκαν στατιστικά για το παιχνιδί με id ${id}`,
          404
        )
      );
    }
    res.status(200).json({
      success: true,
      count: statisticsLiveGame.length,
      data: statisticsLiveGame,
    });
  } else if (type === 1) {
    //Admin
    const statisticsLiveGame = await StatisticsLiveGame.findAll({
      where: [{ game_id: id }],
      order: [['score', 'DESC']],
    });
    res.status(200).json({
      success: true,
      count: statisticsLiveGame.length,
      data: statisticsLiveGame,
    });
  } else {
    return next(new ErrorResponse(`Ο χρήστης δεν έχει δικαίωμα`, 401));
  }
});

//  @desc     Delete live game
//  @route    DELETE /api/v1/livegame/:id
//  @access   Private (Teacher + Admin)
exports.deleteLiveGame = asyncHandler(async (req, res, next) => {
  const type = +req.user.type;
  const userId = +req.user.id;
  const game_id = +req.params.id;

  if (type === 1 || type === 2) {
    const game = await LiveGame.findOne({
      where: { id: game_id },
    });
    if (!game) {
      return next(
        new ErrorResponse(`Το παιχνίδι δεν βρέθηκε με id ${game_id}`, 404)
      );
    }
    if (type === 2) {
      if (game.user_id !== userId) {
        return next(
          new ErrorResponse(
            `Ο χρήστης δεν έχει δικαίωμα να διαγράψει το παιχνίδι`,
            401
          )
        );
      }
    }
    await game.destroy();

    res.status(200).json({ message: 'Επιτυχής διαγραφή!' });
  } else {
    return next(
      new ErrorResponse(
        `Ο χρήστης δεν έχει δικαίωμα να διαγράψει το παιχνίδι`,
        401
      )
    );
  }
});

//  @desc     Saves live game data when it starts
//  @route    POST /api/v1/livegame/start
//  @access   Private  (Teacher + Live Game)
exports.liveGameStart = asyncHandler(async (req, res, next) => {
  const { user_id, quiz_id, category } = req.body;

  //Check if the user exist
  const user = await Users.findOne({
    where: { id: user_id },
  });

  if (!user) {
    return next(
      new ErrorResponse(`Ο χρήστης δεν βρέθηκε με id ${user_id}`, 404)
    );
  }
  //Check if the user id belongs to teacher
  if (user.type !== 2) {
    return next(
      new ErrorResponse(
        `Ο χρήστης δεν έχει δικαίωμα να ξεκινήσει κουίζ πραγματικού χρόνου`,
        401
      )
    );
  }
  const quiz = await Quiz.findOne({
    where: { id: quiz_id },
  });

  if (!quiz) {
    return next(
      new ErrorResponse(`Το κουίζ δεν βρέθηκε με id ${quiz_id}`, 404)
    );
  }

  const liveGame = await LiveGame.create(req.body);

  res.status(201).json({
    success: true,
    gameId: liveGame.id,
  });
});

//  @desc     Stores the statistics of players for live quiz
//  @route    POST /api/v1/livegame/save
//  @access   Private  (Live Game)
exports.liveGameSave = asyncHandler(async (req, res, next) => {
  const { game_id, leaderboard } = req.body;

  //Check if the game exist with game_id
  const game = await LiveGame.findOne({
    where: { id: game_id },
  });

  if (!game) {
    return next(
      new ErrorResponse(`Το παιχνίδι δεν βρέθηκε με id ${game_id}`, 404)
    );
  }

  if (!leaderboard) {
    return next(new ErrorResponse('Σφάλμα αποθήκευσης στατιστικών', 404));
  }

  leaderboard.map(async (player) => {
    if (leaderboard.length > 0) {
      const hasPlayer = await StatisticsLiveGame.findOne({
        where: {
          game_id: game_id,
          player_id: player.playerId,
          username: player.name,
        },
      });
      if (hasPlayer) {
        hasPlayer.score = player.gameData.score.toFixed(2);
        await hasPlayer.save();
      } else {
        await StatisticsLiveGame.create({
          game_id,
          player_id: player.playerId,
          username: player.name,
          score: player.gameData.score.toFixed(2),
        });
      }
    }
  });

  res.status(201).json({
    success: true,
  });
});
