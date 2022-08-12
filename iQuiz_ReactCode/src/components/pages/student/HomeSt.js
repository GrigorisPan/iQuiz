import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Route, useParams, Link } from 'react-router-dom';

import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import {
  listQuizzes,
  listQuizDetailsClean,
} from '../../../actions/quizActions';
import Loader from '../../ui/Loader';
import Button from '@material-ui/core/Button';
import Message from '../../ui/Message';
import ButtonArrow from '../../ui/ButtonArrow';
import { Pagination } from '../../ui/Pagination';
import SearchBox from '../teacher/components/SearchBox';

const useStyles = makeStyles((theme) => ({
  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    //paddingTop: '56.25%', // 16:9
    paddingTop: '75%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  specialText: {
    color: theme.palette.common.orange,
  },
  continueButton: {
    ...theme.typography.secondaryButton,
    borderColor: theme.palette.common.blue,
    color: theme.palette.common.blue,
    height: 40,
    width: 145,
  },
}));

export default function HomeSt() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory;
  const dispatch = useDispatch();

  const { searched } = useParams();

  let indexOfLast = 1;
  let indexOfFirst = 1;
  let currentQuizzes = [];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const quizList = useSelector((state) => state.quizList);
  const { loading, error, quizzes } = quizList;

  useEffect(() => {
    dispatch(listQuizzes(searched));
    dispatch(listQuizDetailsClean());
  }, [dispatch, history, searched]);

  if (!error) {
    // Get current quiz
    indexOfLast = currentPage * itemsPerPage;
    indexOfFirst = indexOfLast - itemsPerPage;
    currentQuizzes = quizzes.slice(indexOfFirst, indexOfLast);
  }

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const displayDate = (timestamp) => {
    const todate = new Date(timestamp).getDate();
    const tomonth = new Date(timestamp).getMonth() + 1;
    const toyear = new Date(timestamp).getFullYear();
    const original_date = todate + '/' + tomonth + '/' + toyear;
    return original_date;
  };

  return (
    <Grid container direction='column' spacing={3}>
      <Route
        render={({ history }) => (
          <SearchBox history={history} role={'student'} />
        )}
      />
      <Divider style={{ marginTop: '1em' }} />
      {loading ? (
        <Loader />
      ) : error ? (
        <Grid container justify='center'>
          <Message severity='error'>{error}</Message>
        </Grid>
      ) : (
        <Grid
          item
          container
          spacing={3}
          justify='center'
          style={{ marginTop: '1.8em' }}
        >
          {currentQuizzes.map((item, i) => (
            <Grid item key={i} xs={12} sm={5} md={4} lg={3} xl={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={`${process.env.REACT_APP_URL_API}/uploads/${item.photo}`}
                  title='Image title'
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant='h6' component='h2'>
                    {item.title}
                  </Typography>

                  <Typography variant='body2'>
                    Καθηγητής:{' '}
                    <span className={classes.specialText}>
                      {item.users_p.username}
                    </span>
                  </Typography>
                  <Typography variant='subtitle2'>
                    Ημερομηνία:{' '}
                    <span className={classes.specialText}>
                      {displayDate(item.createdAt)}
                    </span>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    className={classes.continueButton}
                    component={Link}
                    to={`student/quiz/${item.id}`}
                  >
                    Περισσότερα
                    <ButtonArrow
                      width={15}
                      height={15}
                      fill={theme.palette.common.blue}
                    />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          <Grid item container justify='center'>
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={quizzes.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
