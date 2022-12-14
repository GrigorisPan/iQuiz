const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const sequelize = require('./config/database');
const https = require('https');
const fs = require('fs');

//Import Models
const Users = require('./models/User');
const Quiz = require('./models/Quiz');
const Statistic = require('./models/Statistic');
const Reports = require('./models/Report');
const DigitalClass = require('./models/DigitalClass');
const SuggestQuiz = require('./models/SuggestQuiz');
const InClass = require('./models/InClass');
const LiveGame = require('./models/LiveGame');
const StatisticsLiveGame = require('./models/StatisticsLiveGame');

//Creating associations
//quiz_ps
Users.hasMany(Quiz, {
  foreignKey: 'user_id',
  onDelete: 'cascade',
});
Quiz.belongsTo(Users, { foreignKey: 'user_id' });

//quiz_statistic_ps
Quiz.belongsToMany(Users, {
  through: 'statistic_ps',
  foreignKey: 'quiz_id',
});
Users.belongsToMany(Quiz, {
  through: 'statistic_ps',
  foreignKey: 'user_id',
});
Statistic.belongsTo(Users, { foreignKey: 'user_id' });
Statistic.belongsTo(Quiz, { foreignKey: 'quiz_id' });

//reports_ps
Reports.belongsTo(Users, {
  foreignKey: 'user_id',
  uniqueKey: 'id',
  onDelete: 'cascade',
});
Reports.belongsTo(Quiz, {
  foreignKey: 'quiz_id',
  uniqueKey: 'id',
  onDelete: 'cascade',
});

//digital_class_ps
Users.hasMany(DigitalClass, {
  foreignKey: 'user_id',
});
DigitalClass.belongsTo(Users, { foreignKey: 'user_id' });

//suggest_quiz_ps
Quiz.belongsToMany(DigitalClass, {
  through: 'suggest_quiz_ps',
  foreignKey: 'quiz_id',
});
DigitalClass.belongsToMany(Quiz, {
  through: 'suggest_quiz_ps',
  foreignKey: 'class_id',
});
SuggestQuiz.belongsTo(Quiz, {
  foreignKey: 'quiz_id',
});
SuggestQuiz.belongsTo(DigitalClass, {
  foreignKey: 'class_id',
});

//InClass_ps
Users.belongsToMany(DigitalClass, {
  through: 'inclass_ps',
  foreignKey: 'user_id',
});
DigitalClass.belongsToMany(Users, {
  through: 'inclass_ps',
  foreignKey: 'class_id',
});
InClass.belongsTo(Users, {
  foreignKey: 'user_id',
});
InClass.belongsTo(DigitalClass, {
  foreignKey: 'class_id',
});

//LiveGames
Users.hasMany(LiveGame, {
  foreignKey: 'user_id',
});
Quiz.hasMany(LiveGame, {
  foreignKey: 'quiz_id',
});

LiveGame.belongsTo(Users, {
  foreignKey: 'user_id',
});
LiveGame.belongsTo(Quiz, {
  foreignKey: 'quiz_id',
});

//StatisticsLiveGames
LiveGame.hasMany(StatisticsLiveGame, {
  foreignKey: 'game_id',
});
StatisticsLiveGame.belongsTo(LiveGame, {
  foreignKey: 'game_id',
});

//Route files
const auth = require('./routes/auth');
const quizzes = require('./routes/quizzes');
const users = require('./routes/users');
const statistics = require('./routes/statistics');
const reports = require('./routes/reports');
const digital_class = require('./routes/digital_class');
const suggest_quiz = require('./routes/suggest_quiz');
const game = require('./routes/game');
const live_game = require('./routes/live_game');

// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

//Body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//Dev Logging Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//File uploading
app.use(fileupload());

//Security middlewares

//Production
app.set('trust proxy', true);

//Security Headers
app.use(helmet());
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

// Enable CORS
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:8000'],
  })
);

//Prevent XSS attacks
app.use(xss());

/* //Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10 mins
  max: 100,
});

app.use(limiter); */

//Prevent http param pollution
app.use(hpp());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Mount routers
app.use('/api/v1/auth/', auth);
app.use('/api/v1/quizzes', quizzes);
app.use('/api/v1/users', users);
app.use('/api/v1/statistics', statistics);
app.use('/api/v1/reports', reports);
app.use('/api/v1/digitalclass', digital_class);
app.use('/api/v1/suggestquiz', suggest_quiz);
app.use('/api/v1/game', game);
app.use('/api/v1/livegame', live_game);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

/* const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'cert.key')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.crt.pem')),
  },
  app
); */

const server = app.listen(PORT, async () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}.`.yellow
      .bold
  );
  const result = await sequelize.sync();
  console.log('Database Connnected!'.cyan.underline.bold);
});

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);

  // Close server & exit process
  server.close(() => process.exit(1));
});
