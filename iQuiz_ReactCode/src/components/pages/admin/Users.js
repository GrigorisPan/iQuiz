import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

import TableShow from './components/TableShow';
import {
  getUsersList,
  userDelete,
  deleteUserClean,
} from '../../../actions/userActions';
import { getAllUsersInClass } from '../../../actions/statisticsAction';
import DeleteModal from '../teacher/components/DeleteModal';
import UserInClass from './UsersInClass';
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
  { id: 'id', label: 'Id', minWidth: 20 },
  { id: 'username', label: 'Username', minWidth: 100 },
  {
    id: 'email',
    label: 'Email',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'type',
    label: 'Type',
    minWidth: 20,
    align: 'center',
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

function createData(id, username, email, type, createdAt, updatedAt, more) {
  return { id, username, email, type, createdAt, updatedAt, more };
}
const displayDate = (timestamp) => {
  const todate = new Date(timestamp).getDate();
  const tomonth = new Date(timestamp).getMonth() + 1;
  const toyear = new Date(timestamp).getFullYear();
  const original_date = todate + '/' + tomonth + '/' + toyear;
  return original_date;
};

export default function Users() {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [show, setShow] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const dispatch = useDispatch();
  let history = useHistory();
  const theme = useTheme();

  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const authLogin = useSelector((state) => state.authLogin);
  const { userInfo } = authLogin;

  const userList = useSelector((state) => state.userList);
  const { loading, users, error } = userList;

  const userDeleted = useSelector((state) => state.userDeleted);
  const { success: successDelete, error: errorDelete } = userDeleted;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(getUsersList());
    }
  }, [dispatch, history, userInfo, successDelete, errorDelete]);

  let rows = [];
  if (!error) {
    users.forEach((user) => {
      if (userInfo.id !== user.id) {
        let row = createData(
          user.id,
          user.username,
          user.email,
          user.type,
          user.createdAt,
          user.updatedAt,
          'more'
        );
        rows.push(row);
      }
    });
  }

  //Delete function
  const deleteHandler = (id) => {
    dispatch(userDelete(id));
    setShowMore(false);
    setShow(true);
    setOpen(false);
    setTimeout(() => {
      setShow(false);
      dispatch(deleteUserClean());
    }, 1200);
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
        Πίνακας Χρηστών
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
              toUrl={`/admin/users/edit`}
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
          Δες τους χρήστες που είναι εγγεγραμμένοι σε ψηφιακές τάξεις
        </Typography>
        <Grid item align='center' style={{ marginTop: '0.8em' }}>
          <Button
            className={classes.moreButton}
            variant='contained'
            onClick={() => {
              setShowMore(true);
              dispatch(getAllUsersInClass());
            }}
          >
            Εμφάνιση πίνακα
          </Button>
        </Grid>
      </Grid>
      {showMore && <UserInClass />}
    </>
  );
}
