import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

import {
  getUserDetails,
  updateUserClean,
  updateUserProfile,
  userDetailsClean,
} from '../../../actions/userActions';
import Message from '../../ui/Message';
import MainForm from './components/MainForm';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '88vh',
  },
}));

export default function Profile() {
  const classes = useStyles();
  let history = useHistory();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [show, setShow] = useState('null');

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const authLogin = useSelector((state) => state.authLogin);
  const { userInfo } = authLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const success = userUpdateProfile.success;
  const err = userUpdateProfile.error;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!username) {
      dispatch(getUserDetails(userInfo.id));
    }
  }, [dispatch, history, userInfo, username]);

  useEffect(() => {
    if (user.username) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Οι κωδικοί πρόσβασης δεν ταιριάζουν.');
      setShow(true);
      setTimeout(() => {
        setShow(false);
        setMessage('');
      }, 2000);
    } else if (password.length > 0 && password.length < 5){
      setMessage('Ο κωδικός πρόσβασης πρέπει να περιέχει τουλάχιστον 5 ψηφία.');
      setShow(true);
      setTimeout(() => {
        setShow(false);
        setMessage('');
      }, 2000);
    }  else {
      dispatch(updateUserProfile(userInfo.id, { username, email, password }));
      setShow(true);
      setTimeout(() => {
        setShow(false);
        dispatch(updateUserClean());
      }, 2000);
    }

    dispatch(userDetailsClean());
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
      {show && error && (
        <Grid item container justify='center' style={{ marginBottom: '1em' }}>
          <Message severity='error'>{error}</Message>
        </Grid>
      )}
      {show && err && (
        <Grid item container justify='center' style={{ marginBottom: '1em' }}>
          <Message severity='error'>{err}</Message>
        </Grid>
      )}
      {show && success && (
        <Grid item container justify='center' style={{ marginBottom: '1em' }}>
          <Message severity='success'>Επιτυχή ενημέρωση</Message>
        </Grid>
      )}

      <MainForm
        loading={loading}
        text={'Επεξεργασία προσωπικών στοιχείων!'}
        title={'Προφίλ'}
        submitHandler={submitHandler}
        selection={false}
        setUsername={setUsername}
        setEmail={setEmail}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
        username={username}
        email={email}
        type={''}
      />
    </Grid>
  );
}
