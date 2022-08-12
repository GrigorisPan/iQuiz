import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import {
  deleteUserInClass,
  deleteUserInClassClean,
  getAllUsersInClass,
} from '../../../actions/statisticsAction';
import TableShow from './components/TableShow';
import DeleteModal from '../teacher/components/DeleteModal';
import Loader from '../../ui/Loader';
import Message from '../../ui/Message';

const columns = [
  { id: 'user_id', label: 'User Id', minWidth: 50, align: 'center' },
  { id: 'username', label: 'Username', minWidth: 50, align: 'left' },
  {
    id: 'class_id',
    label: 'Class Id',
    minWidth: 50,
    align: 'center',
  },
  { id: 'class_title', label: 'Class Title', minWidth: 100, align: 'left' },
  {
    id: 'createdAt',
    label: 'CreatedAt',
    minWidth: 50,
    align: 'center',
  },
  {
    id: 'updatedAt',
    label: 'UpdatedAt',
    minWidth: 50,
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
  class_id,
  class_title,
  createdAt,
  updatedAt,
  more
) {
  return {
    id,
    user_id,
    username,
    class_id,
    class_title,
    createdAt,
    updatedAt,
    more,
  };
}


export default function UserInClass() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  let history = useHistory();

  const authLogin = useSelector((state) => state.authLogin);
  const { userInfo } = authLogin;

  const usersInClass = useSelector((state) => state.usersInClass);
  const { loading, users } = usersInClass;

  const usersInClassDeleted = useSelector((state) => state.usersInClassDeleted);
  const { success: successDelete, error: errorDelete } = usersInClassDeleted;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    if (successDelete) {
      dispatch(getAllUsersInClass());
    }
  }, [dispatch, history, userInfo, successDelete, errorDelete]);

  let rows = [];

  users.forEach((user) => {

    const id = `${user.user_id}-${user.class_id}`;
    let row = createData(
      id,
      user.user_id,
      user.users_p.username,
      user.class_id,
      user.digital_class_p.title,
      user.createdAt,
      user.updatedAt,
      'more'
    );
    rows.push(row);
  });

  //Delete function
  const deleteHandler = (ids) => {
    dispatch(deleteUserInClass(ids));
    setShow(true);
    setOpen(false);
    setTimeout(() => {
      setShow(false);
      dispatch(deleteUserInClassClean());
    }, 1300);
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
        Πίνακας Εγγεγραμμένων Χρηστών σε Ψηφιακές Τάξεις
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
