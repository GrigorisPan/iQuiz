import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Message from '../../ui/Message';
import Typography from '@material-ui/core/Typography';
import Loader from '../../ui/Loader';
import {
  digitalClassClean,
  digitalClassUpdate,
  digitalClassUpdateClean,
  getDigitalClass,
} from '../../../actions/digitalClassActions';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    minHeight: '38em',
    maxHeight: '88vh',
    width: '35em',
    padding: '1em 1em',
    boxShadow: '0px 0px 8px 5px rgba(0,0,0,0.2)',
    borderRadius: '10px',
  },

  loginButton: {
    ...theme.typography.mainButton,
    borderRadius: '50px',
    width: '240px',
    height: '40px',
    alignItems: 'center',
    backgroundColor: theme.palette.common.orange,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  specialText: {
    color: theme.palette.common.orange,
  },
  button: {
    ...theme.typography.secondaryButton,
    color: theme.palette.common.blue,
  },
}));

export default function DigitalClassEdit() {
  const classes = useStyles();
  const theme = useTheme();
  const { id } = useParams();

  const matchesXS = useMediaQuery(theme.breakpoints.down('sm'));
  let history = useHistory();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [show, setShow] = useState('null');

  const digitalClass = useSelector((state) => state.digitalClass);
  const { loading, error, dClass } = digitalClass;

  const digitalClassUpdated = useSelector((state) => state.digitalClassUpdated);
  const { loading: load, error: err, success } = digitalClassUpdated;

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(digitalClassClean());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!error) {
      if (!dClass.id || dClass.id !== +id) {
        dispatch(getDigitalClass(id));
      } else {
        setTitle(dClass.title);
        setDescription(dClass.description);
      }
    } else {
      dispatch(getDigitalClass(id));
      if (error) {
        setTimeout(() => {
          history.push('/admin/digitalclass/');
        }, 1000);
      }
    }
    return () => {
      dispatch(digitalClassUpdateClean());
      setShow(false);
    };
  }, [dispatch, history, dClass, error, id]);

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(digitalClassUpdate(id, { title, description }));
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 1300);
  };

  const backHandler = () => {
    history.push('/admin/digitalclass/');
  };

  return (
    <Grid container justify='center' alignItems='center'>
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
          <Grid
            item
            container
            direction='column'
            alignItems='center'
            justify='center'
            className={classes.mainContainer}
          >
            <form onSubmit={updateHandler}>
              <Typography
                gutterBottom
                variant={matchesXS ? 'h4' : 'h3'}
                style={{
                  textAlign: 'center',
                }}
              >
                Επεξεργασία{' '}
                <span className={classes.specialText}>Ψηφιακής Τάξης</span>
              </Typography>
              <Typography
                variant='subtitle1'
                align='center'
                style={{
                  marginBottom: '1em',
                }}
              >
                ID:{id}
              </Typography>
              <Grid
                item
                container
                justify='center'
                direction='column'
                spacing={5}
              >
                <Grid item>
                  <TextField
                    required
                    label='Τίτλος'
                    id='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoComplete='false'
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label='Περιγραφή'
                    id='Περιγραφή'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    fullWidth
                    rows={4}
                    variant='filled'
                  />
                </Grid>
              </Grid>

              <Grid
                item
                container
                alignItems='center'
                justify='center'
                direction='row'
                style={{
                  marginTop: '2em',
                }}
              >
                <Grid item>
                  <Button
                    onClick={() => backHandler()}
                    className={classes.button}
                  >
                    Πίσω
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant='contained'
                    id='submit'
                    type='submit'
                    className={classes.loginButton}
                  >
                    Δημοσίευση
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </>
      )}
    </Grid>
  );
}
