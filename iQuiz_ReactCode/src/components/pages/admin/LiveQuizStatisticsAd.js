import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid, Icon } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';

import {
  getLiveQuizzes,
  liveQuizDelete,
  liveQuizDeleteClean,
} from '../../../actions/liveQuizActions';
import TableShow from './components/TableShow';
import DeleteModal from '../teacher/components/DeleteModal';
import Loader from '../../ui/Loader';
import Message from '../../ui/Message';

const useStyles = makeStyles((theme) => ({
  containerButtons: {
    display: 'flex',
    justifyContent: ' space-around',
    flexWrap: 'nowrap',
  },
  backButton: {
    ...theme.typography.mainButton,
    alignItems: 'center',
    color: theme.palette.common.blue,
    '&:hover': {
      color: theme.palette.primary.light,
    },
  },
}));

const columns = [
  { id: 'id', label: 'Id', minWidth: 20, align: 'center' },
  { id: 'user_id', label: 'User Id', minWidth: 20, align: 'center' },
  { id: 'username', label: 'Username', minWidth: 100, align: 'left' },
  {
    id: 'quiz_id',
    label: 'Quiz Id',
    minWidth: 20,
    align: 'center',
  },
  {
    id: 'quiz_title',
    label: 'Quiz Title',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'category',
    label: 'Category',
    minWidth: 20,
    align: 'center',
  },
  {
    id: 'createdAt',
    label: 'CreatedAt',
    minWidth: 20,
    align: 'center',
  },
  {
    id: 'updatedAt',
    label: 'UpdatedAt',
    minWidth: 20,
    align: 'center',
  },
  {
    id: 'more',
    label: '',
    minWidth: 20,
    align: 'center',
  },
];

function createData(
  id,
  user_id,
  username,
  quiz_id,
  quiz_title,
  category,
  createdAt,
  updatedAt,
  more
) {
  return {
    id,
    user_id,
    username,
    quiz_id,
    quiz_title,
    category,
    createdAt,
    updatedAt,
    more,
  };
}


export default function StatisticsAd() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  let history = useHistory();

  const authLogin = useSelector((state) => state.authLogin);
  const { userInfo } = authLogin;

  const liveQuizList = useSelector((state) => state.liveQuizList);
  const { loading, liveQuizzes } = liveQuizList;

  const liveQuizDeleted = useSelector((state) => state.liveQuizDeleted);
  const { success: successDelete, error: errorDelete } = liveQuizDeleted;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(getLiveQuizzes());
    }
  }, [dispatch, history, userInfo, successDelete, errorDelete]);

  let rows = [];

  liveQuizzes.forEach((game) => {
    let quizCategory;

    //Game Category
    if (game.category === 1) quizCategory = 'Point System';
    else if (game.category === 2) quizCategory = 'Point System - No Penalty';
    else if (game.category === 3) quizCategory = 'Simple Game';
    else if (game.category === 4) quizCategory = 'Simple Game - No Penalty';
    else if (game.category === 5) quizCategory = 'Buzzer Mode';

    let row = createData(
      game.id,
      game.user_id,
      game.users_p.username,
      game.quiz_id,
      game.quiz_p.title,
      quizCategory,
      game.createdAt,
      game.updatedAt,
      'more'
    );
    rows.push(row);
  });

  //Delete function
  const deleteHandler = (id) => {
    dispatch(liveQuizDelete(id));
    setShow(true);
    setOpen(false);
    setTimeout(() => {
      setShow(false);
      dispatch(liveQuizDeleteClean());
    }, 1500);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Grid container style={{ paddingBottom: '2em' }}>
        <Grid container>
          <Button
            className={classes.backButton}
            variant='text'
            component={Link}
            to={`/admin/statistics`}
          >
            <Icon>
              <span className='material-icons'>arrow_back</span>
            </Icon>
            Πίσω
          </Button>
        </Grid>
      </Grid>
      <Typography gutterBottom variant='h3'>
        Πίνακας Live Κουίζ
      </Typography>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Grid container style={{ paddingBottom: '2em' }}>
          {show && successDelete && (
            <Grid container justify='center'>
              <Message severity='success'>Επιτυχής διαγραφή!</Message>
            </Grid>
          )}
          {show && errorDelete && (
            <Grid container justify='center'>
              <Message severity='error'>Σφάλμα</Message>
            </Grid>
          )}
        </Grid>
        {loading ? (
          <Loader />
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
            <TableShow
              columns={columns}
              rows={rows}
              rowsPerPage={rowsPerPage}
              page={page}
              setDeleteId={setDeleteId}
              handleClickOpen={handleClickOpen}
              editBtn={false}
              toUrl={'/admin/statistics/livequiz/ranking'}
              deleteBtn={true}
              seeBtn={true}
            />
          </>
        )}
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
