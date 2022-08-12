import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import { otpQuizCheck } from '../../../../actions/quizActions';

import Typography from '@material-ui/core/Typography';

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

export default function QuestionsForm() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    //console.log('dispatch');
    dispatch(otpQuizCheck(otp));
  };

  return (
    <Grid container alignItems='center' className={classes.mainContainer}>
      <Typography variant='h6' gutterBottom>
        Συμπλήρωση Κωδικού OTP
      </Typography>
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
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </Grid>
          <Button
            type='submit'
            variant='outlined'
            className={classes.continueButton}
          >
            Υποβολή
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}
