import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { Grid, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';

import { listQuizDetails } from '../../actions/quizActions';
import {
  checkCanPlay,
  checkCanPlayClean,
  checkCanReport,
  fetchingQuestionsClean,
} from '../../actions/gameActions';
import RulesModal from './components/RulesModal';
import Message from '../ui/Message';
import Loader from '../ui/Loader';

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
    backgroundColor: '#493a87',
  },
  cardMedia: {
    height: 150,
    width: '50%',
  },
  specialText: {
    color: '#fff',
  },
  startButton: {
    ...theme.typography.mainButton,
    fontSize: '1.4rem',
    marginBottom: '1rem',
    borderRadius: '0.3rem',
    width: '100%',
    height: '40px',
    alignItems: 'center',
    backgroundColor: '#4caf50',
    '&:hover': {
      cursor: 'pointer',
      transform: 'translateY(-0.1rem)',
      transition: 'transform 150ms',
      backgroundColor: '#6fbf73',
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
    color: '#8854c0',
    backgroundColor: '#dedbe8',
    '&:hover': {
      cursor: 'pointer',
      transform: 'translateY(-0.1rem)',
      transition: 'transform 150ms',
    },
  },
}));

export default function MainGame() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let { id } = useParams();
  let history = useHistory();

  const [open, setOpen] = useState(false);

  const quizDetails = useSelector((state) => state.quizDetails);
  const { loading, error, quiz } = quizDetails;

  useEffect(() => {
    dispatch(fetchingQuestionsClean());
    dispatch(listQuizDetails(id));

    if (error) {
      setTimeout(() => {
        history.push('/');
      }, 1500);
    }
  }, [dispatch, id, history, error]);

  const handleClickOpen = (id) => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      dispatch(checkCanPlayClean);
      setOpen(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Grid container justify='center'>
          <Message severity='error'>{error}</Message>
        </Grid>
      ) : (
        <>
          <RulesModal open={open} setOpen={setOpen} handleClose={handleClose} />
          <Grid
            container
            direction='column'
            className={classes.mainContainer}
            spacing={3}
          >
            <Grid item container xs={12} sm={11} md={9} justify='center'>
              <Card className={classes.card} elevation={5}>
                <Hidden xsDown>
                  <CardMedia
                    component='img'
                    /* image='https://picsum.photos/300/200' */
                    image={`${process.env.REACT_APP_URL_API}/uploads/${quiz.photo}`}
                    className={classes.cardMedia}
                    title='Image title'
                  />
                </Hidden>
                <Grid
                  item
                  container
                  className={classes.fixedHeightPaper}
                  justify='center'
                >
                  <CardContent>
                    <Typography
                      variant='h4'
                      style={{ color: '#ee6600', marginBottom: '1em' }}
                    >
                      {quiz.title}
                    </Typography>

                    <Typography variant='subtitle2'>
                      Ερωτήσεις:{' '}
                      <span className={classes.specialText}>
                        {' '}
                        {quiz.questions_count}
                      </span>
                    </Typography>
                  </CardContent>
                </Grid>
              </Card>
            </Grid>
            <Grid item container xs={12} sm={11} md={9} justify='center'>
              <Card
                className={classes.card}
                elevation={5}
                style={{ padding: '2rem 2rem' }}
              >
                <Grid
                  item
                  container
                  className={classes.fixedHeightPaper}
                  justify='center'
                >
                  {' '}
                  <Button
                    className={classes.startButton}
                    variant='contained'
                    onClick={() => {
                      dispatch(checkCanPlay(id));
                      dispatch(checkCanReport(id));
                      handleClickOpen();
                    }}
                  >
                    Έναρξη
                  </Button>
                  <Button
                    className={classes.backButton}
                    variant='contained'
                    onClick={() => {
                      history.push(`/teacher/quiz/${id}`);
                    }}
                  >
                    Πίσω
                  </Button>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
