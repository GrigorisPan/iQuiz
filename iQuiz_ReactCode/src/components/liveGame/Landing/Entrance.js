import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Stars from '../../ui/Stars';
import CardMedia from '@material-ui/core/CardMedia';
import logo from '../../../assets/logo.svg';
import { clientEntryGame } from '../../../actions/liveGameClientActions';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
  },
  mainContainer: {
    minHeight: '37em',
    maxHeight: '88vh',
    maxWidth: '55em',
  },
  startButton: {
    ...theme.typography.mainButton,
    fontSize: '1.4rem',
    marginBottom: '0.5rem',
    borderRadius: '0.3rem',
    width: '100%',
    height: '40px',
    alignItems: 'center',
    backgroundColor: '#333333',
    '&:hover': {
      cursor: 'pointer',
      transform: 'translateY(-0.1rem)',
      transition: 'transform 150ms',
      backgroundColor: '#3d3d3d',
    },
  },
  cardMedia: {
    height: '100%',
    width: '70%',
  },
  backButton: {
    ...theme.typography.mainButton,
    fontSize: '1.4rem',
    marginBottom: '0.8rem',
    borderRadius: '0.3rem',
    width: '100%',
    height: '40px',
    alignItems: 'center',
    color: '#fff',
    backgroundColor: '#ff4e4e',
    '&:hover': {
      backgroundColor: '#f85555',
      cursor: 'pointer',
      transform: 'translateY(-0.1rem)',
      transition: 'transform 150ms',
    },
  },
}));

export default function Entrance() {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(false);
  const [nickname, setNickname] = useState('');
  const [pin, setPin] = useState('');

  const authLogin = useSelector((state) => state.authLogin);
  const { userInfo } = authLogin;

  useEffect(() => {
    if (userInfo) {
      setNickname(userInfo.username);
    }
  }, [userInfo]);

  return (
    <React.Fragment>
      <div>
        <Stars />
      </div>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        className={classes.container}
      >
        <Grid
          item
          container
          justify='center'
          alignItems='center'
          sm={12}
          className={classes.mainContainer}
        >
          <Grid item container xs={11} sm={8} md={6} justify='center'>
            <CardMedia
              component='img'
              image={logo}
              className={classes.cardMedia}
              title='Image title'
            />
            {toggle && (
              <Typography variant='h2' style={{ color: '#fff' }}>
                Γειά σου, {nickname}
              </Typography>
            )}
            <Grid
              item
              container
              className={classes.fixedHeightPaper}
              justify='center'
            >
              {!toggle ? (
                <div>
                  <input
                    type='text'
                    placeholder='Όνομα'
                    className='input-user'
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && nickname.trim().length !== 0) {
                        setToggle(true);
                      }
                    }}
                    required
                  />
                  <Button
                    className={classes.startButton}
                    variant='contained'
                    onClick={() => {
                      if (nickname.trim().length !== 0) {
                        setToggle(true);
                      }
                    }}
                  >
                    Συνέχεια
                  </Button>
                  <Button
                    className={classes.backButton}
                    variant='contained'
                    onClick={() => {
                      history.push('/');
                    }}
                  >
                    Έξοδος
                  </Button>
                </div>
              ) : (
                <div>
                  <input
                    type='text'
                    placeholder='PIN'
                    className='input-user'
                    value={pin}
                    required
                    onChange={(e) => setPin(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        dispatch(clientEntryGame({ nickname, pin }));
                      }
                    }}
                  />
                  <Button
                    className={classes.startButton}
                    variant='contained'
                    onClick={() => {
                      dispatch(clientEntryGame({ nickname, pin }));
                    }}
                  >
                    Έναρξη
                  </Button>
                  <Button
                    className={classes.backButton}
                    variant='contained'
                    onClick={() => {
                      setToggle(false);
                    }}
                  >
                    Πίσω
                  </Button>
                </div>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
