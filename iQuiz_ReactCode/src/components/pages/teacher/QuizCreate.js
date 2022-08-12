import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import DataForm from './components/DataForm';
import QuestionsForm from './components/QuestionsForm';

import Message from '../../ui/Message';
import Loader from '../../ui/Loader';
import {
  otpClean,
  quizNew,
  quizCreateClean,
} from '../../../actions/quizActions';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    minWidth: '100%',
  },
  fixedHeight: {
    height: '100%',
  },

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    ...theme.typography.secondaryButton,
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(1),
  },
}));

export default function QuizCreate() {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [repeat, setRepeat] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const dispatch = useDispatch();

  const otpCheck = useSelector((state) => state.otpCheck);
  const { loading, error, questions } = otpCheck;

  const quizCreate = useSelector((state) => state.quizCreate);
  const { newQuiz } = quizCreate;

  useEffect(() => {
    return () => {
      dispatch(quizCreateClean());
      dispatch(otpClean());
    };
  }, [dispatch]);

  const handleCancel = () => {
    setTitle('');
    setRepeat('');
    setTime('');
    setDescription('');
    setStatus('');
    dispatch(quizCreateClean());
    dispatch(otpClean());
  };

  const handlerCreate = () => {
    const questions_otp = questions.otpCode;
    const questions_count = questions.questions_count;
    dispatch(
      quizNew({
        title,
        repeat,
        description,
        time,
        questions_otp,
        questions_count,
        status,
      })
    );
  };

  const handlerReset = () => {
    setTitle('');
    setTime('');
    setRepeat('');
    setDescription('');
    setStatus('');
    dispatch(quizCreateClean());
    dispatch(otpClean());
  };

  return (
    <Grid container direcrion='column' spacing={0} justify='center'>
      <Grid item container xs={12} sm={10} md={7}>
        <Paper className={fixedHeightPaper}>
          <Typography
            component='h1'
            variant='h4'
            align='center'
            style={{ marginBottom: '1em' }}
          >
            Δημιουργία Κουίζ
          </Typography>
          {questions && (
            <Typography variant='h6' align='center' gutterBottom>
              OTP: {questions.otpCode}
            </Typography>
          )}
          {error && (
            <Grid
              item
              container
              justify='center'
              style={{ marginBottom: '1em' }}
            >
              <Message severity='error'>{error}</Message>
            </Grid>
          )}
          {!questions && <QuestionsForm />}
          {questions && (
            <DataForm
              title={title}
              setTitle={setTitle}
              repeat={repeat}
              setRepeat={setRepeat}
              time={time}
              setTime={setTime}
              description={description}
              setDescription={setDescription}
              status={status}
              setStatus={setStatus}
            />
          )}
          {loading && <Loader />}

          {questions && !newQuiz && (
            <div className={classes.buttons}>
              <Button
                color='primary'
                className={classes.button}
                onClick={handleCancel}
              >
                Ακύρο
              </Button>
              <Button
                variant='contained'
                color='primary'
                className={classes.button}
                onClick={handlerCreate}
              >
                Δημιουργία
              </Button>
            </div>
          )}
          {newQuiz && (
            <div className={classes.buttons}>
              <Button
                color='primary'
                className={classes.button}
                onClick={handlerReset}
              >
                Δημιουργία νέου
              </Button>
            </div>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
