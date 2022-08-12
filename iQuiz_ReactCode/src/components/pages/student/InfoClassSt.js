import React, { useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Icon } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Hidden from '@material-ui/core/Hidden';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import List from '@material-ui/core/List';

import { listSuggestQuiz } from '../../../actions/suggestAction';
import { getScore } from '../../../actions/statisticsAction';
import { getUsersInClass } from '../../../actions/statisticsAction';
import { getDigitalClass } from '../../../actions/digitalClassActions';
import Message from '../../ui/Message';
import Loader from '../../ui/Loader';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    minHeight: '88vh',
  },
  specialText: {
    color: theme.palette.common.orange,
  },

  root: {
    maxWidth: '70%',
    padding: theme.spacing(2),
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
  table: {
    minWidth: 500,
    [theme.breakpoints.down('xs')]: {
      minWidth: '100%',
    },
  },
  suggestQuizText: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
      color: '#464646',
    },
  },
}));

function createData(user, score, play_count) {
  return { user, score, play_count };
}

export default function InfoClassSt() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const { id } = useParams();
  let history = useHistory();

  const digitalClass = useSelector((state) => state.digitalClass);
  const { loading, error, dClass } = digitalClass;

  const quizSuggest = useSelector((state) => state.quizSuggest);
  const { suggest } = quizSuggest;

  const scoreTable = useSelector((state) => state.scoreTable);
  const { score } = scoreTable;

  const usersInClass = useSelector((state) => state.usersInClass);
  const { users } = usersInClass;

  let usersTable = [];
  usersTable = score.map((user) =>
    createData(user.username, user.score, user.play_count)
  );

  useEffect(() => {
    if (!error) {
      dispatch(getDigitalClass(id));
      dispatch(getUsersInClass(id));
      dispatch(listSuggestQuiz(id));
      dispatch(getScore(id));
    }
    if (error) {
      setTimeout(() => {
        history.push('/student/digiClass');
      }, 1000);
    }
  }, [dispatch, id, history, error]);

  return (
    <Grid container direction='column' className={classes.mainContainer}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Grid container justify='center'>
          <Message severity='error'>{error}</Message>
        </Grid>
      ) : (
        <>
          <Grid item container justify='center' className={classes.container}>
            <Card className={classes.root}>
              <Grid item container direction='row'>
                <Grid item sm={matchesXS ? 6 : 9}>
                  <Grid item container direction='column'>
                    <CardContent>
                      <Grid item>
                        <Typography gutterBottom variant='h6'>
                          {dClass.title}
                        </Typography>
                        <Hidden smDown>
                          <Typography gutterBottom variant='subtitle2'>
                            {dClass.description}
                          </Typography>
                        </Hidden>
                      </Grid>
                    </CardContent>
                  </Grid>
                </Grid>
                <Grid item sm={matchesXS ? 6 : 3}>
                  <Grid
                    item
                    container
                    direction='column'
                    alignItems='flex-end'
                    justifycontent='center'
                  >
                    <CardContent style={{ padding: '1em 0.5em' }}>
                      <Grid item>
                        <ListItemIcon
                          style={{ marginRight: '0.5em', fontSize: '1em' }}
                        >
                          <Icon
                            style={{
                              marginRight: '0.5em',
                              fontSize: '1.5em',
                            }}
                          >
                            person
                          </Icon>
                          <span className={classes.specialText}>
                            {users.count}
                          </span>
                        </ListItemIcon>
                      </Grid>
                      <Grid item>
                        <Typography gutterBottom variant='subtitle2'>
                          Κωδικός:{' '}
                          <span className={classes.specialText}>
                            {dClass.id}
                          </span>
                        </Typography>
                      </Grid>
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item style={{ marginTop: '3em' }}>
            <Grid item container direction='row'>
              <Grid item xs={12} sm={12} md={4} style={{ margin: '3em 0em' }}>
                <Grid item container direction='column'>
                  <Grid item align='center'>
                    <List>
                      <Typography
                        component='h2'
                        variant='h6'
                        color='primary'
                        gutterBottom
                      >
                        Προτεινόμενα Κουίζ
                      </Typography>
                      <Divider />
                      {suggest.map((quiz, i) => (
                        <React.Fragment key={quiz.quiz_id + i}>
                          <ListItem
                            component={Link}
                            to={`/student/quiz/${quiz.quiz_id}`}
                          >
                            <Typography
                              key={i}
                              gutterBottom
                              variant='subtitle2'
                              className={classes.suggestQuizText}
                            >
                              {quiz.quiz_p.title} {/* - ID: {quiz.quiz_id} */}
                            </Typography>
                          </ListItem>
                          <Divider />
                        </React.Fragment>
                      ))}
                    </List>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={7}>
                <Grid
                  item
                  container
                  direction='column'
                  alignItems={matchesXS ? 'center' : 'flex-end'}
                >
                  <Grid item align='center'>
                    <Typography
                      component='h2'
                      variant='h6'
                      color='primary'
                      gutterBottom
                    >
                      Βαθμολογική Κατάταξη
                    </Typography>
                    <TableContainer>
                      <Table
                        className={classes.table}
                        aria-label='simple table'
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>Χρήστης</TableCell>
                            <TableCell align='right'>Βαθμολογία</TableCell>
                            <TableCell align='right'>Αρ. Κουίζ</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {usersTable.map((user, i) => (
                            <TableRow key={i}>
                              <TableCell component='th' scope='row'>
                                {user.user}
                              </TableCell>
                              <TableCell align='right'>
                                {user.score.toFixed(2)}
                              </TableCell>
                              <TableCell align='right'>
                                {user.play_count}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
}
