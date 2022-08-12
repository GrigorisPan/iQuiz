import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import {
  reportDelete,
  reportDeleteClean,
} from '../../../actions/reportActions';
import TableShow from './components/TableShow';
import { getReportsAll } from '../../../actions/reportActions';
import DeleteModal from '../teacher/components/DeleteModal';
import Loader from '../../ui/Loader';
import Message from '../../ui/Message';

const columns = [
  { id: 'id', label: 'Id', minWidth: 20, align: 'center' },
  { id: 'user_id', label: 'User Id', minWidth: 20, align: 'center' },
  { id: 'email', label: 'Email', minWidth: 100, align: 'left' },
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
    id: 'question',
    label: 'Question',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'createdAt',
    label: 'CreatedAt',
    minWidth: 20,
    align: 'left',
  },
  {
    id: 'updatedAt',
    label: 'UpdatedAt',
    minWidth: 20,
    align: 'left',
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
  email,
  quiz_id,
  quiz_title,
  question,
  createdAt,
  updatedAt,
  more
) {
  return {
    id,
    user_id,
    email,
    quiz_id,
    quiz_title,
    question,
    createdAt,
    updatedAt,
    more,
  };
}

export default function Quizzes() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  let history = useHistory();

  const authLogin = useSelector((state) => state.authLogin);
  const { userInfo } = authLogin;

  const reportList = useSelector((state) => state.reportList);
  const { loading, reports } = reportList;

  const reportDeleted = useSelector((state) => state.reportDeleted);
  const { success: successDelete, error: errorDelete } = reportDeleted;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(getReportsAll());
    }
  }, [dispatch, history, userInfo, successDelete, errorDelete]);

  let rows = [];

  reports.forEach((report) => {
    let row = createData(
      report.id,
      report.user_id,
      report.users_p.email,
      report.quiz_id,
      report.quiz_p.title,
      report.question,
      report.createdAt,
      report.updatedAt,
      'more'
    );
    rows.push(row);
  });

  //Delete function
  const deleteHandler = (id) => {
    dispatch(reportDelete(id));
    setShow(true);
    setOpen(false);
    setTimeout(() => {
      setShow(false);
      dispatch(reportDeleteClean());
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
        Πίνακας Αναφορών
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
    </>
  );
}
