const express = require('express');
const {
  checkPlay,
  getQuestions,
  saveGameStatistics,
  updateGameStatistics,
  checkQuestions,
} = require('../controllers/game');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route('/:id').get(protect, checkPlay);
router.route('/save').post(protect, saveGameStatistics);
router.route('/save').put(protect, updateGameStatistics);
router.route('/play/:id').get(protect, getQuestions);
router.route('/check/:id').get(protect, checkQuestions);

module.exports = router;
