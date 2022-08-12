import React, { useState, useEffect } from 'react';
import {
  forgotPassword,
  forgotPasswordClean,
} from '../../../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';

import { Grid, TextField, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { Link } from 'react-router-dom';
import Message from '../../ui/Message';
import Loader from '../../ui/Loader';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '80vh',
  },
  mainContainer: {
    minHeight: '35em',
    maxHeight: '88vh',
    maxWidth: '45em',
    padding: '2em 1em',
    boxShadow: '0px 0px 8px 5px rgba(0,0,0,0.2)',
    borderRadius: '10px',
  },
  sendEmailButton: {
    ...theme.typography.mainButton,
    borderRadius: '50px',
    width: '250px',
    height: '45px',
    marginTop: '3.5em',
    [theme.breakpoints.down('sm')]: {
      marginTop: '2em',
      marginBottom: '2em',
    },
    alignItems: 'center',
    backgroundColor: theme.palette.common.orange,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  specialText: {
    color: theme.palette.common.orange,
  },
}));

export default function ForgotPassword() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesMD = useMediaQuery(theme.breakpoints.up('md'));

  const [email, setEmail] = useState('');
  const [show, setShow] = useState('');

  const authForgot = useSelector((state) => state.authForgot);
  const { loading, error, msg, success } = authForgot;

  const dispatch = useDispatch();

  useEffect(() => {
    if (error || msg) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 1500);
    }
  }, [dispatch, error, msg]);
  useEffect(() => {
    return () => {
      dispatch(forgotPasswordClean());
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <React.Fragment>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        className={classes.container}
      >
        {msg && show && (
          <Grid item container justify='center' style={{ marginBottom: '1em' }}>
            <Message severity='success'>{msg}</Message>
          </Grid>
        )}
        {error && show && (
          <Grid item container justify='center' style={{ marginBottom: '1em' }}>
            <Message severity='error'>{error}</Message>
          </Grid>
        )}
        <Grid
          item
          container
          justify='center'
          alignItems='center'
          sm={12}
          className={classes.mainContainer}
        >
          <Grid item>
            {/* Φόρμα επαναφοράς κωδικού */}
            <Grid
              item
              container
              direction='column'
              justify='center'
              alignItems='center'
              style={
                matchesMD ? { marginRight: '10em' } : { marginRight: '0em' }
              }
            >
              <Grid item>
                <Grid item container direction='column' alignItems='center'>
                  <Typography
                    variant={matchesXS ? 'h3' : 'h2'}
                    style={{ lineHeight: 1 }}
                  >
                    Επανέκδοση Κωδικού
                  </Typography>
                  <Typography
                    variant='body1'
                    align='center'
                    style={{ marginTop: '0.8em' }}
                  >
                    Θα λάβετε email με τον κατάλληλο σύνδεσμο για επανέκδοση
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <form onSubmit={submitHandler}>
                  <Grid item>
                    <TextField
                      label='Ηλεκτρονικό ταχυδρομείο'
                      id='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete='false'
                      required
                      style={{ marginTop: '1.2em' }}
                      fullWidth
                    />
                  </Grid>
                  <Typography
                    variant='subtitle2'
                    align='center'
                    style={{ marginTop: '1em' }}
                  >
                    <Link to='/login'>Επιστροφή στη είσοδο</Link>
                  </Typography>
                  <Grid item>
                    {loading && <Loader />}
                    <Button
                      type='submit'
                      variant='contained'
                      disabled={success ? true : false}
                      className={classes.sendEmailButton}
                    >
                      Αποστολή
                    </Button>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
