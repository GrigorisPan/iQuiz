import React, { useState, useEffect } from 'react';
import { register, registerClean } from '../../../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';

import { TextField, Button, FormControl } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Message from '../../ui/Message';
import Loader from '../../ui/Loader';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '80vh',
  },
  mainContainer: {
    minHeight: '38em',
    maxHeight: '88vh',
    width: '35em',
    padding: '3em 1em',
    boxShadow: '0px 0px 8px 5px rgba(0,0,0,0.2)',
    borderRadius: '10px',
  },
  formControl: {
    minWidth: '11em',
    marginTop: '1.3em',
    [theme.breakpoints.down('sm')]: {
      marginTop: '0em',
    },
  },
  signButton: {
    ...theme.typography.mainButton,
    borderRadius: '50px',
    width: '250px',
    height: '45px',
    marginTop: '5em',
    [theme.breakpoints.down('xs')]: {
      marginTop: '2em',
    },
    alignItems: 'center',
    backgroundColor: theme.palette.common.orange,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

export default function Signup() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const [type, setType] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);

  const authRegister = useSelector((state) => state.authRegister);
  const { loading, error } = authRegister;

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
        dispatch(registerClean());
      }, 1500);
    }
  }, [dispatch, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Οι κωδικοί πρόσβασης δεν ταιριάζουν.');
      setShow(true);
      setTimeout(() => setShow(false), 2000);
    } else if (password.length > 0 && password.length < 5) {
      setMessage('Ο κωδικός πρόσβασης πρέπει να περιέχει τουλάχιστον 5 ψηφία.');
      setShow(true);
      setTimeout(() => {
        setShow(false);
        setMessage('');
      }, 2000);
    } else {
      setMessage('');
      dispatch(register(username, email, type, password));
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
      {show && error && (
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
            variant={matchesSM ? 'h3' : 'h2'}
            style={{ lineHeight: 1 }}
            align='center'
          >
            Εγγραφή
          </Typography>
          <Typography
            variant='body1'
            align='center'
            style={{ marginTop: '0.5em' }}
          >
            Μάθε τα πάντα παίζοντας!
          </Typography>
        </Grid>
        <Grid item>
          <Grid item container direction='column'>
            <form onSubmit={submitHandler}>
              <Grid item>
                <FormControl className={classes.formControl}>
                  <InputLabel id='type-user-select-label' required={true}>
                    Κατηγορία χρήστη
                  </InputLabel>
                  <Select
                    labelId='user-role-select-label'
                    id='role-select'
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <MenuItem value={2}>Εκπαιδευτικός</MenuItem>
                    <MenuItem value={0}>Εκπαιδευόμενος</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <TextField
                  label='Όνομα χρήστη'
                  id='name'
                  required={true}
                  style={{ marginTop: '1.1em' }}
                  autoComplete='false'
                  fullWidth
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  label='Ηλεκτρονικό ταχυδρομείο'
                  id='email'
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ marginTop: '1.1em' }}
                  fullWidth
                  autoComplete='false'
                />
              </Grid>
              <Grid item>
                <TextField
                  label='Κωδικός'
                  id='password'
                  required={true}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ marginTop: '1.1em' }}
                  fullWidth
                  type='password'
                  autoComplete='false'
                  helperText='Tουλάχιστον 5 ψηφία '
                />
              </Grid>
              <Grid item>
                <TextField
                  label='Επιβεβαίωση κωδικού'
                  id='Confirm Password'
                  required={true}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ marginTop: '1.1em' }}
                  fullWidth
                  type='password'
                  autoComplete='false'
                />
              </Grid>
              <Grid item>
                <Grid item container justify='center'>
                  {loading && <Loader />}
                  <Button
                    type='submit'
                    variant='contained'
                    className={classes.signButton}
                  >
                    Εγγραφή
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
