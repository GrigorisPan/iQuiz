import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { otpClean, otpQuizCheck } from '../../../../actions/quizActions';
import Loader from '../../../ui/Loader';
import Message from '../../../ui/Message';

const useStyles = makeStyles((theme) => ({
  continueButton: {
    ...theme.typography.secondaryButton,
    borderColor: theme.palette.common.blue,
    color: theme.palette.common.blue,
    height: 40,
    width: 145,
    marginTop: '1em',
    marginLeft: '1em',
  },
  mainContainer: {
    width: '100%',
    flexDirection: 'column',
    display: 'flex',
    marginBottom: '3em',
  },
}));

export default function QuestionsFormAdmin({
  editOTPHandler,
  quizOTP,
  setQuestions_otp,
  setEditOTP,
  setQuestions_count,
}) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [newOtp, setNewOtp] = useState(quizOTP);
  const [show, setShow] = useState(false);

  const otpCheck = useSelector((state) => state.otpCheck);
  const { loading, error, questions } = otpCheck;

  useEffect(() => {
    if (questions) {
      setQuestions_otp(questions.otpCode);
      setQuestions_count(questions.questions_count);
      setShow(true);
      setTimeout(() => {
        setShow(false);
        setEditOTP(false);
      }, 2500);
    }
    if (error) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 1100);
    }
  }, [dispatch, error, questions, setQuestions_otp, setEditOTP]);

  useEffect(() => {
    return () => {
      dispatch(otpClean());
    };
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(otpQuizCheck(newOtp));
  };

  return (
    <Grid container alignItems='center' className={classes.mainContainer}>
      <Typography variant='h6' gutterBottom>
        Επεξεργασία Κωδικού OTP
      </Typography>
      {loading ? (
        <Loader />
      ) : error && show ? (
        <Grid container justify='center'>
          <Message severity='error'>{error}</Message>
        </Grid>
      ) : questions && show ? (
        <Grid container justify='center'>
          <Message severity='info'>
            Σωστός κωδικός - Επιλέξτε το κουμπί "Ενημέρωση" για αλλαγή
          </Message>
        </Grid>
      ) : (
        <form onSubmit={submitHandler}>
          <Grid
            item
            container
            direction='row'
            alignItems='center'
            justify='center'
          >
            <Grid item>
              <TextField
                required
                label='OTP'
                id='otp'
                autoComplete='false'
                value={newOtp}
                onChange={(e) => setNewOtp(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            variant='outlined'
            className={classes.continueButton}
          >
            Έλεγχος
          </Button>
          <Button
            variant='outlined'
            className={classes.continueButton}
            onClick={editOTPHandler}
          >
            Πίσω
          </Button>
        </form>
      )}
    </Grid>
  );
}
