import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

import TableShow from './components/TableShow';
import {
  listLibraryQuizzes,
  quizDelete,
  quizDeleteClean,
} from '../../../actions/quizActions';
import DeleteModal from '../teacher/components/DeleteModal';
import Loader from '../../ui/Loader';
import Message from '../../ui/Message';

const columns = [
  { id: 'id', label: 'Id', minWidth: 20, align: 'center' },
  { id: 'user_id', label: 'User Id', minWidth: 50, align: 'center' },
  { id: 'username', label: 'Username', minWidth: 80, align: 'left' },
  {
    id: 'title',
    label: 'Title',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'repeat',
    label: 'Repeat',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'description',
    label: 'Description',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'time',
    label: 'Time',
    minWidth: 20,
    align: 'center',
  },
  {
    id: 'otp',
    label: 'OTP',
    minWidth: 20,
    align: 'center',
  },
  {
    id: 'count',
    label: 'Count',
    minWidth: 20,
    align: 'center',
  },
  {
    id: 'photo',
    label: 'Photo',
    minWidth: 50,
    align: 'left',
  },
  {
    id: 'photo_name',
    label: 'Photo Name',
    minWidth: 50,
    align: 'left',
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 20,
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
  username,
  title,
  repeat,
  description,
  time,
  otp,
  count,
  photo,
  photo_name,
  status,
  createdAt,
  updatedAt,
  more
) {
  return {
    id,
    user_id,
    username,
    title,
    repeat,
    description,
    time,
    otp,
    count,
    photo,
    photo_name,
    status,
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

  const quizLibraryList = useSelector((state) => state.quizLibraryList);
  const { loading, quizzes } = quizLibraryList;

  const quizDeleted = useSelector((state) => state.quizDeleted);
  const { success: successDelete, error: errorDelete } = quizDeleted;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(listLibraryQuizzes());
    }
  }, [dispatch, history, userInfo, successDelete, errorDelete]);

  let rows = [];

  quizzes.forEach((quiz) => {
    let row = createData(
      quiz.id,
      quiz.user_id,
      quiz.users_p.username,
      quiz.title,
      quiz.repeat,
      quiz.description,
      quiz.time,
      quiz.questions_otp,
      quiz.questions_count,
      quiz.photo,
      quiz.photo_name,
      quiz.status,
      quiz.createdAt,
      quiz.updatedAt,
      'more'
    );
    rows.push(row);
  });

  //Delete function
  const deleteHandler = (id) => {
    dispatch(quizDelete(id));
    setShow(true);
    setOpen(false);
    setTimeout(() => {
      setShow(false);
      dispatch(quizDeleteClean());
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
        Πίνακας Κουίζ
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
              toUrl={`/admin/quizzes/edit`}
              editBtn={true}
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
