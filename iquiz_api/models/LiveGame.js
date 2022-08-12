const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const LiveGame = sequelize.define('livegame_ps', {
  id: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  quiz_id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  category: {
    type: Sequelize.INTEGER(2),
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    /*  get: function () {
      // or use get(){ }

      return this.getDataValue('createdAt').toLocaleString('el-GR', {
        timeZone: 'UTC',
      });
    }, */
  },
  updatedAt: {
    type: Sequelize.DATE,
    /*   get: function () {
      // or use get(){ }
      return this.getDataValue('updatedAt').toLocaleString('el-GR', {
        timeZone: 'GMT',
      });
    }, */
  },
});

module.exports = LiveGame;
