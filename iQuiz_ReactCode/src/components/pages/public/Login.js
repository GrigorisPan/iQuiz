import React, { useState, useEffect } from 'react';
import { login, loginClean } from '../../../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, TextField, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ButtonArrow from '../../ui/ButtonArrow';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Message from '../../ui/Message';
import Loader from '../../ui/Loader';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '80vh',
  },
  mainContainer: {
    minHeight: '37em',
    maxHeight: '88vh',
    maxWidth: '55em',
    padding: '3em 1em',
    boxShadow: '0px 0px 8px 5px rgba(0,0,0,0.2)',
    borderRadius: '10px',
  },
  loginButton: {
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
  continueButton: {
    ...theme.typography.secondaryButton,
    borderColor: theme.palette.common.blue,
    color: theme.palette.common.blue,
    height: 40,
    width: 145,
  },
  specialText: {
    color: theme.palette.common.orange,
  },
}));

export default function Login({ history, location }) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesMD = useMediaQuery(theme.breakpoints.up('md'));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const authLogin = useSelector((state) => state.authLogin);
  const { loading, error } = authLogin;

  useEffect(() => {
    if (error) {
      setShow('true');
      setTimeout(() => {
        setShow(false);
        dispatch(loginClean());
      }, 1500);
    }
  }, [dispatch, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    /* Επαναφορα κωδικού  */
    /* Αν δεν έχεις λογαριασμό δημιούργησε */
    <React.Fragment>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        className={classes.container}
      >
        {error && (
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
            {/* Φόρμα εισόδου */}
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
                    Είσοδος
                  </Typography>
                  <Typography
                    variant='body1'
                    align='center'
                    style={{ marginTop: '0.8em' }}
                  >
                    Μάθε τα πάντα παίζοντας!
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
                      style={{ marginTop: '1.2em' }}
                      fullWidth
                    />
                  </Grid>
                  <TextField
                    label='Κωδικός'
                    id='password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete='false'
                    style={{ marginTop: '1.3em' }}
                    fullWidth
                  />
                  <Typography
                    variant='subtitle2'
                    align='center'
                    style={{ marginTop: '1em' }}
                  >
                    <Link to='/forgot'>Ξεχάσατε τον κωδικό πρόσβασης;</Link>
                  </Typography>
                  <Grid item>
                    {loading && <Loader />}
                    <Button
                      type='submit'
                      variant='contained'
                      className={classes.loginButton}
                    >
                      Είσοδος
                    </Button>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Grid>
          {matchesMD && <Divider orientation='vertical' flexItem />}

          {/* Είσοδος ανώνυμου χρήστη */}
          <Grid item container direction='column' alignItems='center' md={6}>
            <Grid item>
              <Typography
                variant={matchesXS ? 'h4' : 'h3'}
                style={{ lineHeight: 1, marginTop: '1em' }}
              >
                Είσοδος ως<span className={classes.specialText}> Ανώνυμος</span>
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant='outlined'
                style={{ marginTop: '2em' }}
                className={classes.continueButton}
                component={Link}
                to={'/livegame/landing'}
              >
                Συνέχεια
                <ButtonArrow
                  width={15}
                  height={15}
                  fill={theme.palette.common.blue}
                />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
