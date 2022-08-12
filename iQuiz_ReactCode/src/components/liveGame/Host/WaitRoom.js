import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Grid, Button } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Stars from '../../ui/Stars';
import Loader from '../../ui/Loader';
import Message from '../../ui/Message';
import {
  banPlayer,
  hostLiveGame,
  hostPlayGame,
  kickPlayer,
  lobby,
  waitingRoomClean,
} from '../../../actions/liveGameActions';
import LobbyCard from './components/LobbyCard';
import { io } from 'socket.io-client';
import TimerLiveGame from './../Game/TimerLiveGame';

const useStyles = makeStyles((theme) => ({
  container: {
    height: 'auto',
    width: 'auto',
  },
  mainButton: {
    ...theme.typography.mainButton,
    fontWeight: 500,
    fontSize: '1.3em',
    borderRadius: 5,
    backgroundColor: '#333333',
    height: '40px',
    width: '270px',
    margin: '1em 0.5em',
    [theme.breakpoints.down('md')]: {
      height: '35px',
      width: '250px',
    },
    [theme.breakpoints.down('sm')]: {
      height: '35px',
      width: '230px',
    },
    '&:hover': {
      cursor: 'pointer',
      transform: 'translateY(-0.1rem)',
      transition: 'transform 150ms',
      backgroundColor: '#3d3d3d',
    },
  },
  specialText: {
    color: 'black',
    fontWeight: '550',
    [theme.breakpoints.down('md')]: {
      font: '1em',
      fontWeight: '400',
    },
  },
}));

let socket = undefined;
export default function WaitRoom() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  const [isPaused, setIsPaused] = useState(false);
  const start = useRef(false);

  const liveGame = useSelector((state) => state.liveGame);
  const { loading, error, room, players, lsiUrl } = liveGame;

  const quizDetails = useSelector((state) => state.quizDetails);
  const { quiz } = quizDetails;

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        history.push('/teacher');
        dispatch(waitingRoomClean());
      }, 2000);
    }
  }, [dispatch, history, error]);

  useEffect(() => {
    socket = io(`${process.env.REACT_APP_URL_IQUIZ}`, {
      reconnection: false,
    });
    if (socket) {
      dispatch(lobby(socket));
    }
    return () => {
      if (start.current === false) {
        socket.disconnect();
      }
    };
  }, [dispatch, start]);

  const kickHandler = (playerId) => {
    dispatch(kickPlayer(socket, playerId));
  };

  const banHandler = (playerId) => {
    dispatch(banPlayer(socket, playerId));
  };

  const timeEnd = () => {
    start.current = true;
    dispatch(hostPlayGame(socket));
  };

  return (
    <>
      <div>
        <Stars />
      </div>
      <Grid container justify='center' className={classes.container}>
        {loading ? (
          <Loader />
        ) : error ? (
          <Grid container justify='center' alignItems='flex-start'>
            <Message severity='error'>{error}</Message>
          </Grid>
        ) : (
          <Grid
            item
            container
            direction='column'
            justify='center'
            alignItems='center'
            sm={12}
            md={8}
          >
            <Grid item>
              <Typography
                variant={matchesMD ? 'h3' : 'h2'}
                style={{
                  color: '#e0e0e0',
                  margin: '0.5em 0.5em',
                }}
              >
                {quiz.title}
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                variant={matchesMD ? 'h3' : 'h2'}
                style={{ color: '#e0e0e0' }}
              >
                Game PIN:
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='h1'>{room}</Typography>
            </Grid>
            <Grid item>
              <Typography
                variant={matchesMD ? 'h3' : 'h2'}
                style={{
                  color: '#e0e0e0',
                  fontWeight: '400',
                  marginBottom: '0.3em',
                }}
              >
                Join at:{' '}
                {matchesMD ? (
                  <span className={classes.specialText}>{lsiUrl}</span>
                ) : (
                  <span className={classes.specialText}>{lsiUrl}</span>
                )}
              </Typography>
            </Grid>
            <Grid item>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    "<img src='https://<Edit Here>/qrcode/qrcodegenerate.php?size=6&id=http://localhost:3000/login' 'alt'='QRcode' />",
                }}
              />
            </Grid>
            <TimerLiveGame
              page={'lobby'}
              isPaused={isPaused}
              setIsPaused={setIsPaused}
              timer={45}
              timeEnd={timeEnd}
              gameType={undefined}
              socket={undefined}
            />
            <LobbyCard
              players={players}
              kickHandler={kickHandler}
              banHandler={banHandler}
            />
            <Grid item container justify='space-around'>
              <Grid item>
                <Button
                  variant='contained'
                  style={{ color: '#ff4e4e' }}
                  className={classes.mainButton}
                  onClick={() => {
                    dispatch(hostLiveGame());
                  }}
                >
                  Αποχώρηση
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  style={{ color: '#4caf50' }}
                  className={classes.mainButton}
                  onClick={() => {
                    start.current = true;
                    dispatch(hostPlayGame(socket));
                  }}
                >
                  Έναρξη
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
}
