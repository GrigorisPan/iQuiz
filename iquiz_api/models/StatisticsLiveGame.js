const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const StatisticsLiveGame = sequelize.define('statistic_livegame_ps', {
  id: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true,
  },
  game_id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  player_id: {
    type: Sequelize.STRING(25),
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING(30),
    allowNull: false,
  },
  score: {
    type: Sequelize.FLOAT(15),
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
});

module.exports = StatisticsLiveGame;
