import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid, Icon } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import DataFormAdmin from '../admin/components/DataFormAdmin';
import {
  listLibraryQuizDetails,
  listLibraryQuizDetailsClean,
  quizUpdateClean,
  quizUpdateInfo,
} from '../../../actions/quizActions';
import Loader from '../../ui/Loader';
import Message from '../../ui/Message';
import QuestionsFormAdmin from './components/QuestionsFormAdmin';

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
  editButton: {
    backgroundColor: '#808080',
    marginLeft: '1em',
    height: '30px',
    color: '#ffff',
    '&:hover': {
      backgroundColor: '#a6a6a6',
    },
  },
}));

export default function QuizEdit({ match }) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  let { id } = useParams();
  let history = useHistory();

  const dispatch = useDispatch();

  const [previewImage, setPreviewImage] = useState(undefined);
  const [previewImageName, setPreviewImageName] = useState(undefined);
  const [previewShow, setPreviewShow] = useState(true);

  const [questions_otp, setQuestions_otp] = useState('');
  const [questions_count, setQuestions_count] = useState('');
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [repeat, setRepeat] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [show, setShow] = useState(false);
  const [editOTP, setEditOTP] = useState(false);
  const [photo, setPhoto] = useState('');
  const [photoName, setPhotoName] = useState('');

  const quizLibraryDetails = useSelector((state) => state.quizLibraryDetails);
  const { loading, error, quiz } = quizLibraryDetails;

  const quizUpdate = useSelector((state) => state.quizUpdate);
  const err = quizUpdate.error;
  const load = quizUpdate.loading;
  const success = quizUpdate.success;

  useEffect(() => {
    return () => {
      dispatch(listLibraryQuizDetailsClean());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!error) {
      if (!quiz.id || quiz.id !== +id) {
        dispatch(listLibraryQuizDetails(id));
      } else {
        setQuestions_count(quiz.questions_count);
        setQuestions_otp(quiz.questions_otp);
        setTitle(quiz.title);
        setRepeat(quiz.repeat);
        setTime(quiz.time);
        setDescription(quiz.description);
        setStatus(quiz.status);
        setPhoto(quiz.photo);
        setPhotoName(quiz.photo_name);
      }
    } else {
      dispatch(listLibraryQuizDetails(id));
      if (error) {
        setTimeout(() => {
          history.push('/teacher/library/');
        }, 1000);
      }
    }
    return () => {
      dispatch(quizUpdateClean());
      setShow(false);
    };
  }, [dispatch, id, quiz, history, error]);

  const updateHandler = () => {
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
    }, 1300);
  };

  const backHandler = () => {
    history.push('/admin/quizzes/');
  };

  const editOTPHandler = () => {
    editOTP ? setEditOTP(false) : setEditOTP(true);
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
          {!editOTP && (
            <Grid item container justify='center' alignItems='center'>
              <Typography
                variant='h3'
                align='center'
                gutterBottom
                style={{
                  marginBottom: '0.5em',
                  marginTop: '0.5em',
                }}
              >
                OTP: {questions_otp}
              </Typography>

              <Button className={classes.editButton} onClick={editOTPHandler}>
                <Icon>
                  <span className='material-icons'>edit</span>
                </Icon>
              </Button>
            </Grid>
          )}
          <Grid
            container
            direcrion='column'
            spacing={0}
            justify='center'
            style={{ marginTop: '1em' }}
          >
            <Grid item container xs={12} sm={10} md={7}>
              {editOTP && (
                <QuestionsFormAdmin
                  editOTPHandler={editOTPHandler}
                  quizOTP={questions_otp}
                  setQuestions_otp={setQuestions_otp}
                  setEditOTP={setEditOTP}
                  setQuestions_count={setQuestions_count}
                />
              )}
              {!editOTP && (
                <Grid item container justify='center'>
                  <DataFormAdmin
                    id={id}
                    title={title}
                    setTitle={setTitle}
                    repeat={repeat}
                    setRepeat={setRepeat}
                    time={time}
                    photo={photo}
                    photoName={photoName}
                    previewImage={previewImage}
                    previewImageName={previewImageName}
                    setTime={setTime}
                    description={description}
                    setDescription={setDescription}
                    status={status}
                    setStatus={setStatus}
                    setPhoto={setPhoto}
                    setPhotoName={setPhotoName}
                    setPreviewImage={setPreviewImage}
                    setPreviewImageName={setPreviewImageName}
                    previewShow={previewShow}
                    setPreviewShow={setPreviewShow}
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
