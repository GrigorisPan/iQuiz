const express = require('express');
const {
  liveGameStart,
  liveGameSave,
  getLiveGames,
  getLiveGameStatistics,
  deleteLiveGame,
} = require('../controllers/live_game');
const { protect, protectSystemsComm } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect, getLiveGames);
router.route('/statistics/:id').get(protect, getLiveGameStatistics);
router.route('/start').post(protectSystemsComm, liveGameStart);
router.route('/save').post(protectSystemsComm, liveGameSave);
router.route('/:id').delete(protect, deleteLiveGame);
module.exports = router;
