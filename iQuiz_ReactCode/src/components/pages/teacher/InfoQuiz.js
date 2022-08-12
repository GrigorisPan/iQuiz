import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Icon } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import { Button } from '@material-ui/core';

import { listQuizDetails } from '../../../actions/quizActions';
import QuizActions from '../teacher/components/QuizActions';
import Message from '../../ui/Message';
import Loader from '../../ui/Loader';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    minHeight: '88vh',
    alignItems: 'center',
  },
  card: {
    display: 'flex',
    width: '100%',
    height: '100%',
    padding: theme.spacing(3),
    overflow: 'hidden',
  },
  cardMedia: {
    width: '70%',
  },
  specialText: {
    color: theme.palette.common.orange,
  },
  moreButton: {
    ...theme.typography.mainButton,
    borderRadius: '50px',
    width: '220px',
    height: '35px',
    backgroundColor: '#4caf50',
    '&:hover': {
      backgroundColor: '#6fbf73',
    },
  },
}));

export default function InfoQuiz() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let { id } = useParams();
  let history = useHistory();

  const quizDetails = useSelector((state) => state.quizDetails);
  const { loading, error, quiz } = quizDetails;

  useEffect(() => {
    dispatch(listQuizDetails(id));
    if (error) {
      setTimeout(() => {
        history.push('/teacher');
      }, 2000);
    }
  }, [dispatch, id, history, error]);

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      className={classes.mainContainer}
      spacing={3}
    >
      {loading ? (
        <Loader />
      ) : error ? (
        <Grid container justify='center'>
          <Message severity='error'>{error}</Message>
        </Grid>
      ) : (
        <Grid item container xs={12} sm={11} md={9} justify='center'>
          <Card className={classes.card}>
            <Hidden xsDown>
              <CardMedia
                className={classes.cardMedia}
                image={`${process.env.REACT_APP_URL_API}/uploads/${quiz.photo}`}
                title='Image title'
              />
            </Hidden>
            <Grid
              item
              container
              className={classes.fixedHeightPaper}
              justify='center'
            >
              <CardContent>
                <Typography variant='h4'>{quiz.title}</Typography>
                <Typography variant='subtitle2' paragraph>
                  {quiz.description}
                </Typography>
                <Typography variant='body2'>
                  Καθηγητής:{' '}
                  <span className={classes.specialText}>
                    {quiz.users_p.username}
                  </span>
                </Typography>
                <Grid item container direction='column'>
                  <Grid item>
                    <List>
                      <ListItem style={{ padding: '0.1em 0em' }}>
                        <ListItemIcon
                          className={classes.specialText}
                          style={{ marginRight: '0.5em', fontSize: '0.9em' }}
                        >
                          <Icon
                            style={{
                              marginRight: '0.5em',
                              color: '#8561c5',
                              fontSize: '1.6em',
                            }}
                          >
                            query_builder
                          </Icon>
                          {quiz.time} δευτ/ερώτηση
                        </ListItemIcon>
                      </ListItem>
                      <ListItem style={{ padding: '0.1em 0em' }}>
                        <ListItemIcon
                          className={classes.specialText}
                          style={{ marginRight: '0.5em', fontSize: '0.9em' }}
                        >
                          <Icon
                            style={{
                              marginRight: '0.5em',
                              color: '#6fbf73',
                              fontSize: '1.6em',
                            }}
                          >
                            replay
                          </Icon>
                          {quiz.repeat === 0 ? (
                            <span>&infin; φορές</span>
                          ) : (
                            <span>{quiz.repeat} φορές</span>
                          )}
                        </ListItemIcon>
                      </ListItem>
                      <ListItem style={{ padding: '0.1em 0em' }}>
                        <ListItemIcon
                          className={classes.specialText}
                          style={{ marginRight: '0.5em', fontSize: '0.9em' }}
                        >
                          <Icon
                            style={{
                              marginRight: '0.5em',
                              color: '#4dabf5',
                              fontSize: '1.6em',
                            }}
                          >
                            <span>quiz</span>
                          </Icon>
                          {quiz.questions_count} ερωτήσεις
                        </ListItemIcon>
                      </ListItem>
                      <ListItem style={{ padding: '0.1em 0em' }}>
                        <ListItemIcon
                          className={classes.specialText}
                          style={{ marginRight: '0.5em', fontSize: '0.9em' }}
                        >
                          <Icon
                            style={{
                              marginRight: '0.5em',
                              color: '#ed4b82',
                              fontSize: '1.5em',
                            }}
                          >
                            <span className='material-icons-outlined'>
                              mail_outline
                            </span>
                          </Icon>
                          {quiz.users_p.email}
                        </ListItemIcon>
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item style={{ marginTop: '1em ' }} align='center'>
                    <Button
                      className={classes.moreButton}
                      variant='contained'
                      component={Link}
                      to={`/game/${quiz.id}`}
                    >
                      Έναρξη
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Grid>
          </Card>
        </Grid>
      )}
      {!error && !loading && <QuizActions />}
    </Grid>
  );
}
