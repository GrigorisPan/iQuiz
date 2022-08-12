import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { Grid, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import {
  fetchingQuestionsClean,
  startGame,
  updateGame,
} from '../../actions/gameActions';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    minHeight: '88vh',
    alignItems: 'center',
    marginTop: '2em',
  },
  card: {
    display: 'flex',
    width: 600,
    height: '100%',
    padding: theme.spacing(2),
    overflow: 'hidden',
  },
  cardMedia: {
    height: 150,
    width: '50%',
  },
  specialText: {
    textAlign: 'center',
    color: 'black',
  },
  startButton: {
    ...theme.typography.mainButton,
    fontSize: '1.4rem',
    marginBottom: '1rem',
    borderRadius: '0.3rem',
    width: '100%',
    height: '40px',
    alignItems: 'center',
    color: '#8854c0',
    backgroundColor: '#dedbe8',
    '&:hover': {
      cursor: 'pointer',
      transform: 'translateY(-0.1rem)',
      transition: 'transform 150ms',
      backgroundColor: '#dedbe8',
    },
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
    backgroundColor: '#ff8a8a',
    '&:hover': {
      cursor: 'pointer',
      transform: 'translateY(-0.1rem)',
      transition: 'transform 150ms',
      backgroundColor: '#ff7a7a',
    },
  },
}));

export default function EndGame() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let { id } = useParams();
  let history = useHistory();

  const game = useSelector((state) => state.game);
  const { score, true_ans, false_ans } = game;

  const gameSaveScore = useSelector((state) => state.gameSaveScore);
  const { success } = gameSaveScore;

  useEffect(() => {
    if (success) {
      dispatch(updateGame({ quiz_id: id, score, true_ans, false_ans }));
    }
  });
  return (
    <Grid
      container
      direction='column'
      className={classes.mainContainer}
      spacing={3}
    >
      <Grid item container xs={12} sm={11} md={9} justify='center'>
        <Card
          className={classes.card}
          elevation={5}
          style={{ backgroundColor: '#f4f4f4' }}
        >
          <Grid
            item
            container
            className={classes.fixedHeightPaper}
            justify='center'
          >
            <CardContent>
              <Typography
                variant='h4'
                className={classes.specialText}
                style={{
                  marginBottom: '0.2em',
                }}
              >
                Συγχαρητήρια 🎉
              </Typography>

              <Typography
                variant='h4'
                className={classes.specialText}
                style={{
                  marginBottom: '1em',
                }}
              >
                Ολοκλήρωσες το Κουίζ!
              </Typography>
              <Typography
                variant='h2'
                className={classes.specialText}
                style={{
                  marginBottom: '1.3em',
                }}
              >
                Score
                <br />
                {score ? score : 0}
              </Typography>
              <Grid item>
                <Button
                  className={classes.startButton}
                  variant='contained'
                  onClick={() => {
                    dispatch(startGame());
                  }}
                >
                  Αρχική
                </Button>
                <Button
                  className={classes.backButton}
                  variant='contained'
                  onClick={() => {
                    dispatch(fetchingQuestionsClean());
                    dispatch(startGame());
                    history.push(`/teacher/quiz/${id}`);
                  }}
                >
                  Έξοδος
                </Button>
              </Grid>
            </CardContent>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}
