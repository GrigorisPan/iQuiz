import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';
import { Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

import { io } from 'socket.io-client';

import logo from '../../../assets/logo.svg';
import Stars from '../../ui/Stars';
import Loader from '../../ui/Loader';
import Message from '../../ui/Message';

const useStyles = makeStyles((theme) => ({
  specialText: {
    color: theme.palette.common.orange,
  },
  root: {
    height: '100vh',
  },
  mainContainer: {
    minHeight: '88vh',
    alignItems: 'center',
  },

  card: {
    maxWidth: '40em',
    minWidth: '100%',
    minHeight: '35em',
    maxHeight: '25em',
    overflow: 'auto',
    borderRadius: '0.5em',
  },
  cardMedia: {
    height: '100%',
    width: '40%',
    paddingLeft: '1em',
  },
  cardContent: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  nameText: {
    color: '#333',
    fontWeight: '500',
    margin: '0em',
    paddingBottom: '0em',
  },
  numberText: {
    color: '#484848',
    fontWeight: '500',
    margin: '0em',
    paddingBottom: '0em',
  },
  scoreText: {
    color: '#461a42 ',
    fontWeight: '500',
    margin: '0em',
    paddingBottom: '0em',
  },
  divider: {
    width: '70%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  startButton: {
    ...theme.typography.mainButton,
    fontSize: '1.4rem',
    marginBottom: '1rem',
    borderRadius: '0.3rem',
    width: '10em',
    minWidth: '100%',
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
  backButton: {
    ...theme.typography.mainButton,
    fontSize: '1.4rem',
    marginBottom: '0.8rem',
    borderRadius: '0.3rem',
    width: '10em',
    minWidth: '100%',
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
let interval;
export default function Leaderboard() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  let { id } = useParams();

  const [error, setError] = useState(undefined);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    socket = io(`${process.env.REACT_APP_URL_IQUIZ}`, {
      reconnection: true,
    });
    if (socket) {
      getLeaderboard(id);
    }
    return () => {
      socket.disconnect();
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (!error) {
      interval = setInterval(() => {
        getScore(id);
      }, 25000);
    }
    if (error) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, []);

  const getScore = (id) => {
    socket.emit('liveGame-leaderboard', id);
    setLoading(true);
  };

  const getLeaderboard = (id) => {
    console.log('every minute');
    socket.on('connect', function () {
      socket.emit('liveGame-leaderboard', id);
    });

    socket.on('connect_error', (err) => {
      setError('Σφάλμα σύνδεσης');
      setLoading(false);
    });
    socket.on('noGameFound', () => {
      setError('Δεν βρέθηκε το παιχνίδι');
      setLeaderboard([]);
      setLoading(false);
    });
    socket.on('live-score', (data) => {
      setLeaderboard(data);
      setLoading(false);
    });
  };

  return (
    <>
      <div>
        <Stars />
      </div>
      <Grid
        container
        direction='column'
        justify='center'
        className={classes.mainContainer}
      >
        {' '}
        <Grid
          item
          container
          xs={12}
          sm={12}
          md={6}
          lg={5}
          justify='center'
          align='center'
          direction='column'
        >
          <Grid item>
            <CardMedia
              component='img'
              image={logo}
              className={classes.cardMedia}
              title='Image title'
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          justify='center'
          style={{ margin: '0.5em' }}
          xs={11}
          sm={10}
          md={8}
          lg={6}
          xl={5}
        >
          <Card elevation={6} className={classes.card}>
            <Grid
              item
              container
              justify='center'
              style={{
                backgroundColor: '#e0e0e0',
                opacity: '0.9',
                marginBottom: '1em',
              }}
            >
              <CardContent /* className={classes.cardContent} */>
                <Grid item>
                  <Typography variant='h3' style={{ color: '#461a42' }}>
                    Live Leaderboard
                  </Typography>
                </Grid>
              </CardContent>
            </Grid>
            {loading && <Loader />}
            {error && !loading && (
              <Grid container justify='center' alignItems='top'>
                <Message severity='error'>{error}</Message>
              </Grid>
            )}
            {leaderboard &&
              !loading &&
              leaderboard.map((player, i) => {
                return (
                  <Grid
                    key={i}
                    item
                    container
                    direction='row'
                    justify={matchesSM ? 'space-between' : 'center'}
                    style={{ padding: '0em 0.5em' }}
                  >
                    <Grid item sm={1}>
                      <Grid
                        item
                        container
                        direction='column'
                        alignItems='center'
                      >
                        <CardContent className={classes.cardContent}>
                          <Grid item>
                            <Typography
                              gutterBottom
                              variant='subtitle1'
                              className={classes.numberText}
                            >
                              {i + 1}:
                            </Typography>
                          </Grid>
                        </CardContent>
                      </Grid>
                    </Grid>
                    <Grid item sm={8}>
                      <Grid
                        item
                        container
                        direction='column'
                        alignItems='center'
                      >
                        <CardContent className={classes.cardContent}>
                          <Grid item>
                            <Typography
                              gutterBottom
                              variant='subtitle1'
                              className={classes.nameText}
                            >
                              {player.name}
                            </Typography>
                          </Grid>
                        </CardContent>
                      </Grid>
                    </Grid>
                    <Grid item sm={3}>
                      <Grid
                        item
                        container
                        direction='column'
                        justify='center'
                        alignItems='center'
                      >
                        <CardContent className={classes.cardContent}>
                          <Grid item>
                            <Typography
                              gutterBottom
                              variant='subtitle1'
                              className={classes.scoreText}
                            >
                              {player.gameData.score.toFixed(2)}
                            </Typography>
                          </Grid>
                        </CardContent>
                      </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                  </Grid>
                );
              })}
          </Card>
          <Grid item>
            <Typography variant='body1' style={{ color: '#ffff' }}>
              **The leaderboard updates every 25s.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
