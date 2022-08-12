import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Icon } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import {
  listLibraryQuizzes,
  quizDelete,
  listLibraryQuizDetailsClean,
} from '../../../actions/quizActions';
import Message from '../../ui/Message';
import DeleteModal from '../teacher/components/DeleteModal';
import { Pagination } from '../../ui/Pagination';
import Loader from '../../ui/Loader';

const useStyles = makeStyles((theme) => ({
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
  editButton: {
    backgroundColor: '#4caf50',
    color: '#ffff',
    '&:hover': {
      backgroundColor: '#6fbf73',
    },
  },
  deleteButton: {
    ...theme.typography.mainButton,
    backgroundColor: '#ff1744',
    color: '#ffff',
    '&:hover': {
      backgroundColor: '#ff4569',
    },
  },
  button: {
    ...theme.typography.secondaryButton,
    color: theme.palette.common.blue,
  },
}));

export default function Library({ match }) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const dispatch = useDispatch();

  const quizLibraryList = useSelector((state) => state.quizLibraryList);
  const { loading, error, quizzes } = quizLibraryList;

  const authLogin = useSelector((state) => state.authLogin);
  const { userInfo } = authLogin;

  const quizDeleted = useSelector((state) => state.quizDeleted);
  const { success: successDelete, error: errorDelete } = quizDeleted;

  const displayDate = (timestamp) => {
    const todate = new Date(timestamp).getDate();
    const tomonth = new Date(timestamp).getMonth() + 1;
    const toyear = new Date(timestamp).getFullYear();
    const original_date = todate + '/' + tomonth + '/' + toyear;
    return original_date;
  };

  useEffect(() => {
    dispatch(listLibraryQuizzes());
    return () => {
      dispatch(listLibraryQuizDetailsClean());
    };
  }, [dispatch, successDelete, errorDelete]);

  //Delete function
  const deleteHandler = (id) => {
    dispatch(quizDelete(id));
    setShow(true);
    setOpen(false);
    setTimeout(() => {
      setShow(false);
    }, 1000);
  };

  // Get current quiz
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentQuizzes = quizzes.slice(indexOfFirst, indexOfLast);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleClickOpen = (id) => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
      setDeleteId(0);
    }
  };

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item container justify='center'>
        <Grid item>
          <Typography
            gutterBottom
            variant={matchesXS ? 'h4' : 'h3'}
            align='center'
            style={{
              marginBottom: '1em',
            }}
          >
            Τα <span className={classes.specialText}>Κουίζ </span>σου
          </Typography>
        </Grid>
      </Grid>
      <Divider style={{ marginTop: '1em' }} />
      {show && successDelete && (
        <Grid container justify='center'>
          <Message severity='success'>Επιτυχής διαγραφή!</Message>
        </Grid>
      )}
      {show && errorDelete && (
        <Grid container justify='center'>
          <Message severity='error'>{error}</Message>
        </Grid>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Grid container justify='center'>
          <Message severity='error'>{error}</Message>
        </Grid>
      ) : (
        <>
          <DeleteModal
            open={open}
            setDeleteId={setDeleteId}
            setOpen={setOpen}
            deleteHandler={deleteHandler}
            deleteId={deleteId}
            handleClose={handleClose}
          />
          <Grid
            item
            container
            spacing={3}
            justify='center'
            style={{ marginTop: '1.8em' }}
          >
            {currentQuizzes.map(
              (item, i) =>
                item.user_id === userInfo.id && (
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
                        <Typography variant='body2'>
                          Κατάσταση:{' '}
                          <span className={classes.specialText}>
                            {item.status === 'public' ? 'Δημόσιο' : 'Ιδιωτικό'}
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
                        <Grid
                          item
                          container
                          direction='row'
                          justify='space-between'
                          alignItems='center'
                        >
                          <Button
                            className={classes.editButton}
                            component={Link}
                            to={`/teacher/library/edit/${item.id}`}
                          >
                            <Icon>
                              <span className='material-icons-outlined'>
                                edit
                              </span>
                            </Icon>
                          </Button>

                          <Button
                            className={classes.deleteButton}
                            id={item.id}
                            onClick={() => {
                              setDeleteId(item.id);
                              handleClickOpen();
                            }}
                          >
                            <Icon>
                              <span className='material-icons-outlined'>
                                delete
                              </span>
                            </Icon>
                          </Button>
                        </Grid>
                      </CardActions>
                    </Card>
                  </Grid>
                )
            )}
            <Grid item container justify='center'>
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={quizzes.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
}
