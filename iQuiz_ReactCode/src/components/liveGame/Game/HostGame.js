import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Grid, makeStyles, useTheme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';

import { io } from 'socket.io-client';
import {
  endGame,
  hostGame,
  nextQuestion,
  startPageGame,
} from '../../../actions/liveGameActions';
import Loader from '../../ui/Loader';
import Message from '../../ui/Message';
import TimerLiveGame from '../Game/TimerLiveGame';
import GameData from './components/GameData';
import FillerCard from './components/FillerCard';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    minHeight: '88vh',
    alignItems: 'center',
    marginTop: '1rem',
  },
  endButton: {
    ...theme.typography.mainButton,
    backgroundColor: '#ff4e4e',
    color: '#ffff',
    margin: '1em 1em',
    '&:hover': {
      backgroundColor: '#f85555',
    },
  },
  nextButton: {
    ...theme.typography.mainButton,
    backgroundColor: '#dbdbdb',
    margin: '1em 1em',
    color: '#461a42',
    '&:hover': {
      backgroundColor: '#e5e5e5',
    },
  },
}));

let socket;
let gameType;
export default function HostGame() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const dispatch = useDispatch();

  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  const liveGame = useSelector((state) => state.liveGame);
  const {
    loading,
    error,
    hostId,
    question,
    settings,
    playersAnswered,
    questionLive,
  } = liveGame;

  const time = useRef(settings.time);

  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [showCorrect, setShowCorrect] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (question) {
      getOptions(question.data[0], setOptions);
    }
    if (error) {
      setTimeout(() => {
        dispatch(startPageGame());
      }, 2000);
    }
  }, [dispatch, history, error, question]);

  useEffect(() => {
    socket = io(`${process.env.REACT_APP_URL_IQUIZ}`, {
      reconnection: false,
    });
    if (socket) {
      dispatch(hostGame(socket));
      socket.on('getTime', function (data) {
        socket.emit('time', {
          playerId: data.playerId,
          time: time,
          ansFlag: data.ansFlag,
        });
      });
    }
    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  if (settings.category === 1) gameType = 'Point System';
  else if (settings.category === 2) gameType = 'Point System - No Penalty';
  else if (settings.category === 3) gameType = 'Simple Game';
  else if (settings.category === 4) gameType = 'Simple Game - No Penalty';
  else if (settings.category === 5) gameType = 'Buzzer Mode';

  const getOptions = (question, setOptions) => {
    const options = [];
    const questionsCopy = JSON.parse(JSON.stringify(question));
    delete questionsCopy.theQuestion;
    delete questionsCopy.correct;

    for (const [i, opt] of Object.entries(questionsCopy)) {
      options.push(opt[0]);
    }
    setOptions(options);
  };

  const controlTimer = () => {
    setIsPaused(!isPaused);
  };
  const controlVisible = () => {
    setIsVisible(!isVisible);
  };
  const controlShowCorrect = () => {
    setShowCorrect(!showCorrect);
  };

  const nextQuestionHandler = () => {
    dispatch(nextQuestion(socket));
  };

  const endGameHandler = () => {
    setShowCorrect(false);
    dispatch(endGame(socket));
  };

  return (
    <Grid container direction='column' className={classes.mainContainer}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Grid container justify='center' alignItems='top'>
          <Message severity='error'>{error}</Message>
        </Grid>
      ) : questionLive ? (
        <>
          <Grid item container lg={12} xl={9} justify='center'>
            <Grid item container direction='row' justify='space-between'>
              <Grid item>
                <Typography variant='subtitle1' style={{ color: '#ee6600' }}>
                  Answers:{' '}
                  {playersAnswered ? playersAnswered.playersAnswered : '0'} /{' '}
                  {question.playersInGame}
                </Typography>
              </Grid>
              <Typography variant='subtitle1' style={{ color: '#ee6600' }}>
                Game Mode: {gameType}
              </Typography>
              <Typography variant='subtitle1' style={{ color: '#ee6600' }}>
                Question: {question.questionNum} / {question.questionsLength}
              </Typography>
            </Grid>
            <Typography
              variant={matchesMD ? 'h4' : 'h3'}
              style={{ color: '#fff' }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: `${question.data[0].theQuestion}`,
                }}
              ></div>
            </Typography>
          </Grid>
          <Grid item container lg={12} xl={9} justify='space-between'>
            <Grid item>
              {
                <TimerLiveGame
                  page={'game'}
                  isPaused={isPaused}
                  setIsPaused={setIsPaused}
                  timer={settings.time}
                  time={time}
                  gameType={settings.category}
                  socket={socket}
                />
              }
            </Grid>
            <Grid item>
              <Typography variant='subtitle1' style={{ color: '#ee6600' }}>
                Leaders: {question.leaders[0]} / {question.leaders[1]}
              </Typography>
            </Grid>
          </Grid>
          {showCorrect && (
            <Grid item container md={6} justify='center'>
              <Message>
                Η σωστή απάντηση είναι το {question.data[0].correct}
              </Message>
            </Grid>
          )}
          {
            <GameData
              hostId={hostId}
              isPaused={isPaused}
              isVisible={isVisible}
              showCorrect={showCorrect}
              options={options}
              controlTimer={controlTimer}
              controlVisible={controlVisible}
              controlShowCorrect={controlShowCorrect}
            />
          }
          <Grid item container justify={matchesMD ? 'center' : 'space-around'}>
            <Button
              variant='contained'
              className={classes.endButton}
              onClick={() => {
                endGameHandler();
              }}
            >
              Τερματισμός Κουίζ
            </Button>
            <Button
              variant='contained'
              className={classes.nextButton}
              onClick={() => {
                setShowCorrect(false);
                nextQuestionHandler();
              }}
            >
              Επόμενη Ερώτηση
            </Button>
          </Grid>
        </>
      ) : (
        <Grid item container justify='center' sm={12} md={10} lg={12}>
          {
            <FillerCard
              nextQuestionHandler={nextQuestionHandler}
              setShowCorrect={setShowCorrect}
            />
          }
          <Grid item container justify={matchesMD ? 'center' : 'space-around'}>
            <Button
              variant='contained'
              className={classes.endButton}
              onClick={() => {
                endGameHandler();
              }}
            >
              Τερματισμός Κουίζ
            </Button>
            <Button
              variant='contained'
              className={classes.nextButton}
              onClick={() => {
                setShowCorrect(false);
                nextQuestionHandler();
              }}
            >
              Συνέχεια
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
