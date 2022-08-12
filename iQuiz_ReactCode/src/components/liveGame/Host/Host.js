import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

import Stars from '../../ui/Stars';
import logo from '../../../assets/logo.svg';
import SettingsCard from './components/SettingsCard';
import Loader from '../../ui/Loader';
import Message from '../../ui/Message';
import { listQuizDetails } from '../../../actions/quizActions';
import { setSettings, waitingRoom } from '../../../actions/liveGameActions';
import RulesModalLiveGame from './components/RulesModalLiveGame';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '88vh',
  },
  mainContainer: {
    maxHeight: '100vh',
    maxWidth: '80em',
  },

  cardMedia: {
    height: '100%',
    width: '50%',
  },
}));

export default function Host() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  let { id } = useParams();

  const [open, setOpen] = useState(false);
  const [gameCategory, setGameCategory] = useState(1);
  const [gameTime, setGameTime] = useState(15);
  const [feadbackChecked, setFeadbackChecked] = useState(false);
  const [failQuotaChecked, setFailQuotaChecked] = useState(false);
  const [numFailQuota, setNumFailQuota] = useState(1);

  const feedbackHandler = (event) => {
    setFeadbackChecked(event.target.checked);
  };

  const failQuotaHandler = (event) => {
    setFailQuotaChecked(event.target.checked);
  };
  const quizDetails = useSelector((state) => state.quizDetails);
  const { loading, error, quiz } = quizDetails;

  const authLogin = useSelector((state) => state.authLogin);
  const { userInfo } = authLogin;

  useEffect(() => {
    dispatch(listQuizDetails(id));
    if (error) {
      setTimeout(() => {
        history.push('/teacher');
      }, 2000);
    }
  }, [dispatch, id, history, error]);

  const startHandler = () => {
    dispatch(
      setSettings({
        userId: +userInfo.id,
        quizId: +id,
        category: +gameCategory,
        time: +gameTime,
        feedback: feadbackChecked,
        failQuota: failQuotaChecked,
        numFailQuota,
      })
    );
    dispatch(waitingRoom());
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  return (
    <>
      <div>
        <Stars />
      </div>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        className={classes.root}
      >
        {loading ? (
          <Loader />
        ) : error ? (
          <Grid container justify='center' alignItems='top'>
            <Message severity='error'>{error}</Message>
          </Grid>
        ) : (
          <>
            <RulesModalLiveGame
              open={open}
              setOpen={setOpen}
              handleClose={handleClose}
              startHandler={startHandler}
              gameCategory={gameCategory}
              gameTime={gameTime}
              feadbackChecked={feadbackChecked}
              failQuotaChecked={failQuotaChecked}
              numFailQuota={numFailQuota}
            />
            <Grid
              item
              container
              justify='center'
              alignItems='center'
              className={classes.mainContainer}
            >
              <Grid
                item
                container
                xs={11}
                sm={8}
                md={6}
                justify='center'
                align='center'
                direction='column'
              >
                <Grid item>
                  <CardMedia
                    component='img'
                    image={logo}
                    className={classes.cardMedia}
                    title='Image title'
                  />
                </Grid>
                <Grid item>
                  <Typography
                    variant='h3'
                    style={{ color: '#fff', marginBottom: '1em' }}
                  >
                    {quiz.title}
                  </Typography>
                </Grid>
                <Grid item container justify='space-evenly'>
                  <Grid item>
                    <Typography
                      variant='h3'
                      style={{
                        color: '#fff',
                        marginBottom: '0.2em',
                        textAlign: 'center',
                      }}
                    >
                      Ερωτήσεις:
                    </Typography>
                    <Typography
                      variant='h4'
                      style={{
                        color: '#fff',
                        marginBottom: '1em',
                        textAlign: 'center',
                      }}
                    >
                      {quiz.questions_count}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant='h3'
                      style={{
                        color: '#fff',
                        marginBottom: '0.2em',
                        textAlign: 'center',
                      }}
                    >
                      OTP:
                    </Typography>
                    <Typography
                      variant='h4'
                      style={{
                        color: '#fff',
                        marginBottom: '1em',
                        textAlign: 'center',
                      }}
                    >
                      {quiz.questions_otp}
                    </Typography>
                  </Grid>
                </Grid>
                <SettingsCard
                  gameCategory={gameCategory}
                  setGameCategory={setGameCategory}
                  gameTime={gameTime}
                  setGameTime={setGameTime}
                  numFailQuota={numFailQuota}
                  setNumFailQuota={setNumFailQuota}
                  startHandler={startHandler}
                  feedbackHandler={feedbackHandler}
                  failQuotaHandler={failQuotaHandler}
                  feadbackChecked={feadbackChecked}
                  failQuotaChecked={failQuotaChecked}
                  handleClickOpen={handleClickOpen}
                />
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}
