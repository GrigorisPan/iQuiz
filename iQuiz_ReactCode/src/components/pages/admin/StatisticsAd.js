import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';

import {
  getStatisticsAll,
  deleteStatisticsClean,
  deleteStatistics,
} from '../../../actions/statisticsAction';
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
  editButton: {
    backgroundColor: '#4caf50',
    marginRight: '0.2em',
    color: '#ffff',
    '&:hover': {
      backgroundColor: '#6fbf73',
    },
  },
  deleteButton: {
    ...theme.typography.mainButton,
    backgroundColor: '#ff1744',
    marginLeft: '0.2em',
    color: '#ffff',
    '&:hover': {
      backgroundColor: '#ff4569',
    },
  },
  moreButton: {
    ...theme.typography.mainButton,
    borderRadius: '50px',
    width: '250px',
    height: '50px',
    alignItems: 'center',
    backgroundColor: theme.palette.common.blue,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  mainText: {
    textAlign: 'center',
    padding: '0.5em 3.5em',
    [theme.breakpoints.down('md')]: {
      padding: '0.5em 1.5em',
    },
  },
}));

const columns = [
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
    id: 'score_avg',
    label: 'Score Avg',
    minWidth: 20,
    align: 'center',
  },
  {
    id: 'correct_avg',
    label: 'Correct Avg',
    minWidth: 20,
    align: 'center',
  },
  {
    id: 'false_avg',
    label: 'False Avg',
    minWidth: 20,
    align: 'center',
  },
  {
    id: 'play_count',
    label: 'Play Count',
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
  score_avg,
  correct_avg,
  false_avg,
  play_count,
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
    score_avg,
    correct_avg,
    false_avg,
    play_count,
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
  const theme = useTheme();

  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const dispatch = useDispatch();
  let history = useHistory();

  const authLogin = useSelector((state) => state.authLogin);
  const { userInfo } = authLogin;

  const quizStatistics = useSelector((state) => state.quizStatistics);
  const { loading, statistics } = quizStatistics;

  const deletedStatistics = useSelector((state) => state.deletedStatistics);
  const { success: successDelete, error: errorDelete } = deletedStatistics;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(getStatisticsAll());
    }
  }, [dispatch, history, userInfo, successDelete, errorDelete]);

  let rows = [];

  statistics.forEach((statistic) => {

    const id = `${statistic.user_id}-${statistic.quiz_id}`;
    
    let row = createData(
      id,
      statistic.user_id,
      statistic.users_p.username,
      statistic.quiz_id,
      statistic.quiz_p.title,
      statistic.score_avg,
      statistic.correct_avg,
      statistic.false_avg,
      statistic.play_count,
      statistic.createdAt,
      statistic.updatedAt,
      'more'
    );
    rows.push(row);
  });

  //Delete function
  const deleteHandler = (ids) => {
    dispatch(deleteStatistics(ids));
    setShow(true);
    setOpen(false);
    setTimeout(() => {
      setShow(false);
      dispatch(deleteStatisticsClean());
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
      <Typography gutterBottom variant='h3'>
        Πίνακας Στατιστικών
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
              toUrl={'#'}
              deleteBtn={true}
              seeBtn={false}
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
      <Grid
        container
        direction='column'
        justifycontent='center'
        alignItems='center'
        style={{ margin: '2em 0em' }}
      >
        <Typography
          variant={matchesXS ? 'subtitle2' : 'subtitle1'}
          align='center'
          className={classes.mainText}
        >
          Δες τα αποθηκευμένα Live Κουίζ και την βαθμολογική κατάταξη των
          συμμετεχόντων
        </Typography>
        <Grid item align='center' style={{ marginTop: '0.8em' }}>
          <Button
            className={classes.moreButton}
            variant='contained'
            component={Link}
            to={`/admin/statistics/livequiz`}
          >
            Περισσότερα
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
