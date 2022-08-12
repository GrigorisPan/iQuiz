import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import DataForm from './components/DataForm';
import {
  listLibraryQuizDetails,
  listLibraryQuizDetailsClean,
  quizUpdateClean,
  quizUpdateInfo,
} from '../../../actions/quizActions';
import Loader from '../../ui/Loader';
import Message from '../../ui/Message';

const useStyles = makeStyles((theme) => ({
  fixedHeight: {
    height: '100%',
  },
  specialText: {
    color: theme.palette.common.orange,
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

export default function EditQuiz({ match }) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  let { id } = useParams();
  let history = useHistory();

  const dispatch = useDispatch();

  const [questions_count, setQuestions_count] = useState('');
  const [title, setTitle] = useState('');
  const [repeat, setRepeat] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [show, setShow] = useState('false');

  const quizLibraryDetails = useSelector((state) => state.quizLibraryDetails);
  const { loading, error, quiz } = quizLibraryDetails;

  const quizUpdate = useSelector((state) => state.quizUpdate);
  const err = quizUpdate.error;
  const load = quizUpdate.loading;
  const success = quizUpdate.success;

  const authLogin = useSelector((state) => state.authLogin);
  const { userInfo } = authLogin;

  useEffect(() => {
    if (!error) {
      if (!quiz.id || quiz.id !== +id) {
        dispatch(listLibraryQuizDetails(id));
      } else {
        setQuestions_count(quiz.questions_count);
        setTitle(quiz.title);
        setRepeat(quiz.repeat);
        setTime(quiz.time);
        setDescription(quiz.description);
        setStatus(quiz.status);
      }
    } else {
      dispatch(listLibraryQuizDetails(id));
      if (error) {
        setTimeout(() => {
          history.push('/teacher/library/');
          dispatch(listLibraryQuizDetailsClean());
        }, 2000);
      }
    }
    return () => {
      dispatch(quizUpdateClean());
      setShow(false);
    };
  }, [dispatch, id, quiz, history, error]);

  const updateHandler = () => {
    const questions_otp = quiz.questions_otp;
    dispatch(
      quizUpdateInfo(id, {
        title,
        repeat,
        description,
        time,
        questions_otp,
        questions_count,
        status,
      })
    );
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 2000);
  };

  const backHandler = () => {
    history.push('/teacher/library/');
    dispatch(listLibraryQuizDetailsClean());
    dispatch(quizUpdateClean());
  };
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item container justify='center'>
        <Grid item>
          <Typography
            gutterBottom
            variant={matchesXS ? 'h4' : 'h3'}
            align='center'
            style={{
              lineHeight: '1.3em',
            }}
          >
            Επεξεργασία <span className={classes.specialText}>Κουίζ</span>
          </Typography>
        </Grid>
      </Grid>
      <Divider style={{ marginTop: '1em' }} />
      {loading || load ? (
        <Loader />
      ) : error ? (
        <Grid container justify='center'>
          <Message severity='error'>{error}</Message>
        </Grid>
      ) : (
        <>
          {show && err && (
            <Grid
              item
              container
              justify='center'
              style={{ marginBottom: '1em' }}
            >
              <Message severity='error'>{err}</Message>
            </Grid>
          )}
          {show && success && (
            <Grid
              item
              container
              justify='center'
              style={{ marginBottom: '1em' }}
            >
              <Message severity='success'>Επιτυχής Ενημέρωση</Message>
            </Grid>
          )}
          <Typography
            variant='h3'
            align='center'
            gutterBottom
            style={{
              marginBottom: '0.5em',
              marginTop: '0.5em',
            }}
          >
            OTP: {quiz.questions_otp}
          </Typography>
          <Grid
            container
            direcrion='column'
            spacing={0}
            justify='center'
            style={{ marginTop: '1em' }}
          >
            <Grid item container xs={12} sm={10} md={7}>
              {quiz.users_p.id === userInfo.id && (
                <Grid item container justify='center'>
                  <DataForm
                    id={id}
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

                  <div className={classes.buttons}>
                    <Button
                      color='primary'
                      className={classes.button}
                      onClick={backHandler}
                    >
                      Πίσω
                    </Button>
                    <Button
                      variant='contained'
                      color='primary'
                      className={classes.button}
                      onClick={updateHandler}
                    >
                      Ενημέρωση
                    </Button>
                  </div>
                </Grid>
              )}
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
}
