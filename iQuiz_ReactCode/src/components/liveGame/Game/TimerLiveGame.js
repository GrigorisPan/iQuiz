import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import { Icon } from '@material-ui/core';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import '../../ui/animate.css';
import { timeUp } from '../../../actions/liveGameActions';

const useStyles = makeStyles((theme) => ({
  timeButton: {
    ...theme.typography.mainButton,
    color: theme.palette.common.blue,
    height: 50,
    width: 60,
    margin: '0.5em 0.5em',
    [theme.breakpoints.down('md')]: {
      marginLeft: '0.5em',
      height: 50,
      width: 50,
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0.3em',
      height: 45,
      width: 45,
    },
  },
}));

export default function TimerLiveGame({
  page,
  isPaused,
  setIsPaused,
  timer,
  timeEnd,
  time,
  gameType,
  socket,
}) {
  const [timeLeft, setTimeLeft] = useState(timer);
  const classes = useStyles();
  const dispatch = useDispatch();

  const intervalRef = useRef();

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    intervalRef.current = id;
    if (isPaused) {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [setTimeLeft, isPaused]);

  const increaseTimer = () => {
    setTimeLeft((prev) => prev + 30);
  };

  const decreaseTimer = () => {
    if (timeLeft - 30 > 0) {
      setTimeLeft((prev) => prev - 30);
    } else {
      setTimeLeft(0);
    }
  };

  const controlTimer = () => {
    setIsPaused(!isPaused);
  };

  if (time) {
    time.current = timeLeft;
  }
  const timeOver = () => {
    dispatch(timeUp(socket));
  };
  useEffect(() => {
    if (page === 'game') {
      if (timeLeft === 0) {
        clearInterval(intervalRef.current);
        timeOver();
      }
    }
    if (page === 'lobby') {
      if (timeLeft === 0) {
        clearInterval(intervalRef.current);
        timeEnd();
      }
    }
  }, [timeLeft]);

  const ScoreDiplay = (timeLeft) => {
    const correctScore = ((timeLeft / timer) * 100).toFixed(1);
    const falseScore = ((1 / 4) * correctScore).toFixed(1);
    return (
      <span style={{ backgroundColor: '#592154' }}>
        [{correctScore} / -{falseScore}]
      </span>
    );
  };

  return (
    <>
      {page === 'lobby' ? (
        <>
          <Grid item container justify='space-evenly'>
            <Grid item>
              <Button
                variant='contained'
                style={{ color: '#ff1744' }}
                className={classes.timeButton}
                onClick={() => {
                  decreaseTimer();
                }}
              >
                -30s
              </Button>
              <Button
                className={classes.timeButton}
                style={{ background: '#e0e0e0' }}
                onClick={() => {
                  controlTimer();
                }}
              >
                <Icon>
                  <span className='material-icons-outlined'>
                    {isPaused ? 'play_arrow' : 'pause'}
                  </span>
                </Icon>
              </Button>
              <Button
                variant='contained'
                style={{ color: '#4caf50' }}
                className={classes.timeButton}
                onClick={() => {
                  increaseTimer();
                }}
              >
                +30s
              </Button>
            </Grid>
          </Grid>
          <div className='timer'>
            <span style={{ color: '#fff' }}>AutoStart Quiz in: </span>
            {timeLeft}
          </div>
        </>
      ) : (
        <Typography variant='subtitle1' style={{ color: '#ee6600' }}>
          Time: {timeLeft} {gameType === 1 && ScoreDiplay(timeLeft)}
        </Typography>
      )}
    </>
  );
}
