import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import Typography from '@material-ui/core/Typography';
import Message from '../../../ui/Message';
import { digitalClassReqEnroll } from '../../../../actions/digitalClassActions';
import Loader from '../../../ui/Loader';

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

export default function DigitalClassSubFormSt() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [dclassId, setDclassId] = useState('');
  const [show, setShow] = useState(false);

  const digitalClassEnroll = useSelector((state) => state.digitalClassEnroll);
  const { loading, error, success } = digitalClassEnroll;

  useEffect(() => {
    return () => {
      setDclassId('');
      setShow(false);
    };
  }, [setDclassId, setShow]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(digitalClassReqEnroll({ class_id: dclassId }));
    setShow(true);
    setDclassId('');
    setTimeout(() => {
      setShow(false);
    }, 1500);
  };

  return (
    <Grid container alignItems='center' className={classes.mainContainer}>
      {show && success && (
        <Message style={{ marginTop: '0em' }} severity='success'>
          Επιτυχής εγγραφή
        </Message>
      )}
      {show && error && (
        <Message style={{ marginTop: '0em' }} severity='error'>
          {error}
        </Message>
      )}
      <Typography variant='h6' gutterBottom style={{ marginTop: '0.5em' }}>
        Κωδικός Ψηφιακής Τάξης
      </Typography>
      {loading && <Loader />}
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
              label='Κωδικός'
              id='dClassCode'
              autoComplete='false'
              value={dclassId}
              onChange={(e) => setDclassId(e.target.value)}
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
