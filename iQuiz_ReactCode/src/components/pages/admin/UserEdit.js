import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

import {
  getUserDetails,
  updateUserClean,
  updateUserProfile,
  userDetailsClean,
} from '../../../actions/userActions';
import Message from '../../ui/Message';
import MainForm from '../teacher/components/MainForm';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '88vh',
  },
}));

export default function UserEdit() {
  const classes = useStyles();
  let history = useHistory();
  let { id } = useParams();

  const [type, setType] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [show, setShow] = useState('false');

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const success = userUpdateProfile.success;
  const err = userUpdateProfile.error;

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(userDetailsClean());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!error) {
      if (!user.id || user.id !== +id) {
        dispatch(getUserDetails(id));
      } else {
        setUsername(user.username);
        setEmail(user.email);
        setType(user.type);
      }
    } else {
      dispatch(getUserDetails(id));
      if (error) {
        setShow(true);
        setTimeout(() => {
          history.push('/login');
        }, 1000);
      }
    }

    return () => {
      dispatch(updateUserClean());
      setShow(false);
    };
  }, [dispatch, history, user, error, id]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Οι κωδικοί πρόσβασης δεν ταιριάζουν.');
      setShow(true);
      setTimeout(() => {
        setShow(false);
        setMessage('');
      }, 1500);
    } else if (password.length > 0 && password.length < 5) {
      setMessage('Ο κωδικός πρόσβασης πρέπει να περιέχει τουλάχιστον 5 ψηφία.');
      setShow(true);
      setTimeout(() => {
        setShow(false);
        setMessage('');
      }, 1500);
    } else {
      dispatch(updateUserProfile(user.id, { username, email, type, password }));
      setShow(true);
      setTimeout(() => {
        setShow(false);
        dispatch(updateUserClean());
      }, 1500);
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
      {show && error ? (
        <Grid item container justify='center' style={{ marginBottom: '1em' }}>
          <Message severity='error'>{error}</Message>
        </Grid>
      ) : (
        <MainForm
          loading={loading}
          text={'Επεξεργασία χρήστη'}
          title={`ID: ${id}`}
          submitHandler={submitHandler}
          selection={true}
          setUsername={setUsername}
          setEmail={setEmail}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          username={username}
          email={email}
          type={type}
          setType={setType}
          isAdmin={true}
        />
      )}
    </Grid>
  );
}
