import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

import TableShow from './components/TableShow';

import {
  getDigitalClassListAll,
  deleteDigitalClass,
  deleteDigitalClassClean,
} from '../../../actions/digitalClassActions';
import DeleteModal from '../teacher/components/DeleteModal';
import Loader from '../../ui/Loader';
import Message from '../../ui/Message';

const columns = [
  { id: 'id', label: 'Id', minWidth: 20, align: 'center' },
  { id: 'user_id', label: 'User Id', minWidth: 20, align: 'center' },
  { id: 'username', label: 'Username', minWidth: 100, align: 'left' },
  {
    id: 'title',
    label: 'Title',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'description',
    label: 'Description',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'createdAt',
    label: 'CreatedAt',
    minWidth: 20,
    align: 'right',
  },
  {
    id: 'updatedAt',
    label: 'UpdatedAt',
    minWidth: 20,
    align: 'right',
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
  description,
  createdAt,
  updatedAt,
  more
) {
  return {
    id,
    user_id,
    username,
    title,
    description,
    createdAt,
    updatedAt,
    more,
  };
}

export default function DigitalClasses() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  let history = useHistory();

  const authLogin = useSelector((state) => state.authLogin);
  const { userInfo } = authLogin;

  const digitalClassListAll = useSelector((state) => state.digitalClassListAll);
  const { loading, dClasses } = digitalClassListAll;

  const digitalClassDeleted = useSelector((state) => state.digitalClassDeleted);
  const { success: successDelete, error: errorDelete } = digitalClassDeleted;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(getDigitalClassListAll());
    }
  }, [dispatch, history, userInfo, successDelete, errorDelete]);

  let rows = [];

  dClasses.forEach((dClass) => {
    let row = createData(
      dClass.id,
      dClass.user_id,
      dClass.users_p.username,
      dClass.title,
      dClass.description,
      dClass.createdAt,
      dClass.updatedAt,
      'more'
    );
    rows.push(row);
  });

  //Delete function
  const deleteHandler = (id) => {
    dispatch(deleteDigitalClass(id));
    setShow(true);
    setOpen(false);
    setTimeout(() => {
      setShow(false);
      dispatch(deleteDigitalClassClean());
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
        Πίνακας Ψηφιακών Τάξεων
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
              toUrl={`/admin/digitalclass/edit`}
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
