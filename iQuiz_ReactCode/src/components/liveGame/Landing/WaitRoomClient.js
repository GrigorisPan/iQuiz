import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';

import logo from '../../../assets/logo.svg';
import {
  playerJoin,
  playerJoinReset,
} from '../../../actions/liveGameClientActions';
import Stars from '../../ui/Stars';
import Loader from '../../ui/Loader';
import Message from '../../ui/Message';
import { io } from 'socket.io-client';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
  },
  mainContainer: {
    minHeight: '37em',
    maxHeight: '88vh',
    maxWidth: '55em',
  },
  startButton: {
    ...theme.typography.mainButton,
    fontSize: '1.4rem',
    marginBottom: '0.5rem',
    borderRadius: '0.3rem',
    width: '100%',
    height: '40px',
    alignItems: 'center',
    backgroundColor: '#333333',
    '&:hover': {
      cursor: 'pointer',
      transform: 'translateY(-0.1rem)',
      transition: 'transform 150ms',
      backgroundColor: '#3d3d3d',
    },
  },
  cardMedia: {
    height: '100%',
    width: '70%',
  },
  backButton: {
    ...theme.typography.mainButton,
    fontSize: '1.4rem',
    marginBottom: '0.8rem',
    borderRadius: '0.3rem',
    width: '100%',
    height: '40px',
    alignItems: 'center',
    color: '#fff',
    backgroundColor: '#ff4e4e',
    '&:hover': {
      backgroundColor: '#f85555',
      cursor: 'pointer',
      transform: 'translateY(-0.1rem)',
      transition: 'transform 150ms',
    },
  },
}));

let socket;

export default function WaitRoomClient() {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();

  const liveGameClient = useSelector((state) => state.liveGameClient);
  const { loading, error, connection, gameStarted, playerId } = liveGameClient;

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(playerJoinReset(socket));
      }, 2000);
    }
    if (gameStarted) {
      history.push(`/livegame/game/${playerId}`);
    }
  }, [dispatch, history, error, gameStarted]);

  useEffect(() => {
    socket = io(`${process.env.REACT_APP_URL_IQUIZ}`, {
      reconnection: false,
    });
    if (socket) {
      if (!connection) {
        dispatch(playerJoin(socket));
      }
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <div>
        <Stars />
      </div>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        className={classes.container}
      >
        <Grid
          item
          container
          justify='center'
          alignItems='center'
          sm={12}
          className={classes.mainContainer}
        >
          <Grid item container xs={11} sm={8} md={6} justify='center'>
            <CardMedia
              component='img'
              image={logo}
              className={classes.cardMedia}
              title='Image title'
            />

            <Grid
              item
              container
              className={classes.fixedHeightPaper}
              justify='center'
            >
              {loading ? (
                <Loader />
              ) : error ? (
                <Grid
                  item
                  container
                  justify='center'
                  style={{ marginBottom: '1em' }}
                >
                  <Message severity='error'>{error}</Message>
                </Grid>
              ) : connection ? (
                <>
                  <Loader />
                  <Typography
                    variant='h3'
                    style={{ color: '#fff', textAlign: 'center' }}
                  >
                    Το κουίζ θα ξεκινήσει σύντομα!
                  </Typography>
                </>
              ) : (
                <Typography variant='h3' style={{ color: '#fff' }}>
                  Σύνδεση
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
