import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import {
  listSuggestQuizAll,
  deleteSuggestQuiz,
  deleteQuizClean,
} from '../../../actions/suggestAction';
import TableShow from './components/TableShow';
import DeleteModal from '../teacher/components/DeleteModal';
import Loader from '../../ui/Loader';
import Message from '../../ui/Message';

const columns = [
  { id: 'class_id', label: 'Class Id', minWidth: 50, align: 'center' },
  { id: 'class_title', label: 'Class Title', minWidth: 100, align: 'left' },
  {
    id: 'quiz_id',
    label: 'Quiz Id',
    minWidth: 50,
    align: 'center',
  },
  {
    id: 'quiz_title',
    label: 'Quiz Title',
    minWidth: 100,
    align: 'left',
  },
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
  class_id,
  class_title,
  quiz_id,
  quiz_title,
  createdAt,
  updatedAt,
  more
) {
  return {
    id,
    class_id,
    class_title,
    quiz_id,
    quiz_title,
    createdAt,
    updatedAt,
    more,
  };
}


export default function SuggestQuizzes() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  let history = useHistory();

  const authLogin = useSelector((state) => state.authLogin);
  const { userInfo } = authLogin;

  const quizSuggest = useSelector((state) => state.quizSuggest);
  const { loading, suggest } = quizSuggest;

  const deletedSuggest = useSelector((state) => state.deletedSuggest);
  const { success: successDelete, error: errorDelete } = deletedSuggest;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(listSuggestQuizAll());
    }
  }, [dispatch, history, userInfo, successDelete, errorDelete]);

  let rows = [];

  suggest.forEach((suggest) => {

    const id = `${suggest.class_id}-${suggest.quiz_id}`;
    let row = createData(
      id,
      suggest.class_id,
      suggest.digital_class_p.title,
      suggest.quiz_id,
      suggest.quiz_p.title,
      suggest.createdAt,
      suggest.updatedAt,
      'more'
    );
    rows.push(row);
  });

  //Delete function
  const deleteHandler = (ids) => {
    dispatch(deleteSuggestQuiz(ids));
    setShow(true);
    setOpen(false);
    setTimeout(() => {
      setShow(false);
      dispatch(deleteQuizClean());
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
        Πίνακας Προτεινόμενων Κουίζ
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
