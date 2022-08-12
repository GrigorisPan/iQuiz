import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CardMedia from '@material-ui/core/CardMedia';
import { Grid, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

import logo from '../../../assets/logo.svg';
import Stars from '../../ui/Stars';
import { exitGame, startPageGame } from '../../../actions/liveGameActions';

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

export default function EndGame() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const liveGame = useSelector((state) => state.liveGame);
  const { leaderboard } = liveGame;

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
              <CardContent>
                <Grid item>
                  <Typography variant='h3' style={{ color: '#461a42' }}>
                    Leaderboard
                  </Typography>
                </Grid>
              </CardContent>
            </Grid>
            {leaderboard &&
              leaderboard.map((player, i) => {
                return (
                  <Grid
                    item
                    container
                    direction='row'
                    justify={matchesSM ? 'space-between' : 'center'}
                    style={{ padding: '0em 0.5em' }}
                    key={i}
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
          <Grid
            item
            container
            justify='space-around'
            style={{ marginTop: '1.5em' }}
          >
            <Grid item>
              <Button
                variant='contained'
                className={classes.backButton}
                onClick={() => dispatch(exitGame())}
              >
                Έξοδος Κουίζ
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                className={classes.startButton}
                onClick={() => dispatch(startPageGame())}
              >
                Αρχική
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
