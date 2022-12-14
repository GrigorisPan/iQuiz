const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const Quiz = sequelize.define('quiz_ps', {
  id: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.INTEGER(11),
    allowNull: true,
  },
  title: {
    type: Sequelize.STRING(25),
    allowNull: false,
    unique: {
      args: true,
      msg: 'Ο τίτλος πρέπει να είναι μοναδικός',
    },
    validate: {
      notEmpty: { msg: 'Ο τίτλος δεν πρέπει να είναι κενός' },
      notNull: { msg: 'Παρακαλώ εισάγετε τίτλο' },
    },
  },
  repeat: {
    type: Sequelize.INTEGER(10),
    allowNull: false,
    validate: {
      /* notEmpty: { msg: 'Παρακαλώ εισάγετε επανάληψη' }, */
      notNull: { msg: 'Παρακαλώ εισάγετε επανάληψη' },
      isInt: { msg: 'Παρακαλώ εισάγετε επανάληψη' },
    },
  },
  description: {
    type: Sequelize.STRING(300),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Η περιγραφή δεν πρέπει να είναι κενή' },
      notNull: { msg: 'Παρακαλώ εισάγετε περιγραφή' },
    },
  },
  time: {
    type: Sequelize.INTEGER(2),
    allowNull: false,
    validate: {
      isInt: { msg: 'Ο χρόνος πρέπει να είναι ακέραιος αριθμός' },
      notEmpty: { msg: 'Ο χρόνος δεν πρέπει να είναι κενός' },
      notNull: { msg: 'Παρακαλώ εισάγετε χρόνο' },
    },
  },
  questions_otp: {
    type: Sequelize.INTEGER(10),
    allowNull: false,
    /* unique: {
      args: true,
      msg: 'Otp πρέπει να είναι μοναδικός',
    }, */
    validate: {
      isInt: { msg: 'Ο κωδικός otp πρέπει να είναι ακέραιος αριθμός' },
      notEmpty: { msg: 'Ο κωδικός otp δεν πρέπει να είναι κενός' },
      notNull: { msg: 'Παρακαλώ εισάγετε κωδικό otp' },
    },
  },
  questions_count: {
    type: Sequelize.INTEGER(10),
    allowNull: false,
  },
  photo: {
    type: Sequelize.STRING(300),
    defaultValue: 'no-photo.png',
  },
  photo_name: {
    type: Sequelize.STRING(300),
    defaultValue: 'no-photo.png',
  },
  status: {
    type: Sequelize.STRING(10),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Η κατάσταση δεν πρέπει να είναι κενή' },
      notNull: { msg: 'Παρακαλώ εισάγετε κατάσταση' },
    },
  },

});

module.exports = Quiz;
