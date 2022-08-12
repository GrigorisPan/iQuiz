import React, { useState, useEffect } from 'react';
import {
  resetPassword,
  resetPasswordClean,
} from '../../../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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
}));

export default function ResetPassword() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const { resettoken } = useParams();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);

  const authReset = useSelector((state) => state.authReset);
  const { loading, error, msg, success } = authReset;

  const dispatch = useDispatch();

  useEffect(() => {
    if (error || msg) {
      console.log(error);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 1500);
    }
  }, [dispatch, error, msg]);

  useEffect(() => {
    return () => {
      dispatch(resetPasswordClean());
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Οι κωδικοί πρόσβασης δεν ταιριάζουν.');
      setShow(true);
      setTimeout(() => setShow(false), 2000);
    }else if (password.length > 0 && password.length < 5){
      setMessage('Ο κωδικός πρόσβασης πρέπει να περιέχει τουλάχιστον 5 ψηφία.');
      setShow(true);
      setTimeout(() => {
        setShow(false);
        setMessage('');
      }, 2000);
    } else {
      setMessage('');
      dispatch(resetPassword(password, resettoken));
    }
  };
  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      className={classes.container}
    >
      {show && message && (
        <Grid item container justify='center' style={{ marginBottom: '1em' }}>
          <Message severity='warning'>{message}</Message>
        </Grid>
      )}
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
        direction='column'
        alignItems='center'
        justify='center'
        className={classes.mainContainer}
      >
        <Grid item>
          <Typography
            variant={matchesXS ? 'h3' : 'h2'}
            style={{ lineHeight: 1 }}
            align='center'
          >
            Επανέκδοση Κωδικού
          </Typography>
          <Typography
            variant='body1'
            align='center'
            style={{ marginTop: '0.8em' }}
          >
            Εισάγετε νέο κωδικό
          </Typography>
        </Grid>
        <Grid item>
          <Grid item container direction='column'>
            <form onSubmit={submitHandler}>
              <Grid item>
                <TextField
                  label='Νέος κωδικός'
                  id='password'
                  required={true}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ marginTop: '1.3em' }}
                  fullWidth
                  type='password'
                  autoComplete='false'
                  helperText='Tουλάχιστον 5 ψηφία '
                />
              </Grid>
              <Grid item>
                <TextField
                  label='Επιβεβαίωση νέου κωδικού'
                  id='Confirm Password'
                  required={true}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ marginTop: '1.3em' }}
                  fullWidth
                  type='password'
                  autoComplete='false'
                />
              </Grid>
              <Typography
                variant='subtitle2'
                align='center'
                style={{ marginTop: '0.5em' }}
              >
                <Link to='/login'>Επιστροφή στη είσοδο</Link>
              </Typography>
              <Typography
                variant='subtitle2'
                align='center'
                style={{ marginTop: '0.5em' }}
              >
                <Link to='/forgot'>Επιστροφή στη επαναφορά κωδικού</Link>
              </Typography>

              <Grid item>
                <Grid item container justify='center'>
                  {loading && <Loader />}
                  <Button
                    type='submit'
                    variant='contained'
                    disabled={success ? true : false}
                    className={classes.sendEmailButton}
                  >
                    Επιβεβαίωση
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
