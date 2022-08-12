import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Icon } from '@material-ui/core';

import {
  getLiveQuizStatistics,
  getLiveQuizzes,
  liveQuizDelete,
  liveQuizDeleteClean,
  liveQuizStatisticsClean,
} from '../../../actions/liveQuizActions';

import Message from '../../ui/Message';
import Loader from '../../ui/Loader';
import LiveQuizStatisticsTable from './components/LiveQuizStatisticsTable';
import DeleteModal from './components/DeleteModal';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    minHeight: '70vh',
  },
  specialText: {
    color: theme.palette.common.orange,
  },
  searchButton: {
    ...theme.typography.mainButton,
    borderRadius: '50px',
    width: '150px',
    height: '34px',
    backgroundColor: '#4caf50',
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
}));

export default function LiveQuizStatistics() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const dispatch = useDispatch();

  const [tempLiveQuizCategory, setTempLiveQiuzCategory] = useState(0);
  const [liveQuizCategory, setLiveQiuzCategory] = useState(0);
  const [liveGameId, setLiveGameId] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [show, setShow] = useState(false);

  const liveQuizList = useSelector((state) => state.liveQuizList);
  const { loading, liveQuizzes, error } = liveQuizList;

  const liveQuizStatistics = useSelector((state) => state.liveQuizStatistics);
  const loadStat = liveQuizStatistics.loading;
  const errorStat = liveQuizStatistics.error;
  const successStat = liveQuizStatistics.success;
  const liveQuizStat = liveQuizStatistics.liveQuizStat;

  const liveQuizDeleted = useSelector((state) => state.liveQuizDeleted);
  const { success: successDelete, error: errorDelete } = liveQuizDeleted;

  useEffect(() => {
    dispatch(getLiveQuizzes());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(liveQuizStatisticsClean());
    };
  }, [dispatch]);

  const displayDateTime = (timestamp) => {
    const DateTime = new Date(timestamp);
    const original_date = DateTime.toLocaleString('el-GR');
    return original_date;
  };

  const handleChange = (event) => {
    setLiveGameId(Number(event.target.value) || undefined);
    //Access/Get Custom data- Attribute Values
    let idx = event.target.selectedIndex;
    let dataset = event.target.options[idx].dataset;
    setTempLiveQiuzCategory(Number(dataset.category) || 0);
  };

  const handleSearch = () => {
    setDeleteId(Number(liveGameId) || '');
    setLiveQiuzCategory(tempLiveQuizCategory);
    dispatch(getLiveQuizStatistics(liveGameId));
  };

  //Delete function
  const deleteHandler = (deleteId) => {
    dispatch(liveQuizDelete(deleteId));
    dispatch(liveQuizStatisticsClean());
    setShow(true);
    setOpen(false);
    setTempLiveQiuzCategory(0);
    setLiveQiuzCategory(0);
    setLiveGameId(undefined);
    setTimeout(() => {
      setShow(false);
      dispatch(liveQuizDeleteClean());
      dispatch(getLiveQuizzes());
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
  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      className={classes.mainContainer}
    >
      <DeleteModal
        open={open}
        setDeleteId={setDeleteId}
        setOpen={setOpen}
        deleteHandler={deleteHandler}
        deleteId={deleteId}
        handleClose={handleClose}
      />

      <Grid item>
        <Typography
          gutterBottom
          variant={matchesXS ? 'h4' : 'h3'}
          align='center'
          style={{
            margin: '1em 0em',
          }}
        >
          Αναζήτηση <span className={classes.specialText}>Live Κουίζ</span>
        </Typography>
      </Grid>

      <Grid
        item
        container
        direction='column'
        xs={12}
        sm={8}
        md={6}
        lg={5}
        style={{ marginBottom: '1.5em' }}
      >
        {loading ? (
          <Loader />
        ) : error ? (
          <Grid container justify='center'>
            <Message severity='error'>{'Σφάλμα'}</Message>
          </Grid>
        ) : (
          <Grid item>
            <Box component='form' sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <FormControl
                fullWidth
                style={{
                  textAlign: 'center',
                }}
              >
                <InputLabel htmlFor='ids-select-native'>
                  Ημερομηνία και Ώρα (Κουίζ)
                </InputLabel>
                <Select
                  style={{ textAlignLast: 'center', marginTop: '1em' }}
                  native
                  onClick={handleChange}
                >
                  <option aria-label='None' value='' />
                  {liveQuizzes.map((liveQuiz) => (
                    <option
                      key={liveQuiz.id}
                      data-category={liveQuiz.category}
                      value={liveQuiz.id}
                    >
                      {`${displayDateTime(liveQuiz.createdAt)}(${
                        liveQuiz.quiz_p.title
                      })`}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        )}

        <Grid item style={{ marginTop: '2em ' }} align='center'>
          <Button
            className={classes.searchButton}
            variant='contained'
            onClick={handleSearch}
            disabled={!liveGameId ? true : false}
          >
            <Icon
              style={{
                fontSize: '1.7em',
              }}
            >
              search
            </Icon>
          </Button>
        </Grid>
        {show && errorDelete && (
          <Grid container justify='center'>
            <Message severity='error'>Σφάλμα</Message>
          </Grid>
        )}
        {show && successDelete && (
          <Grid container justify='center'>
            <Message severity='success'>Επιτυχής διαγραφή!</Message>
          </Grid>
        )}
      </Grid>

      {loadStat && <Loader />}
      {errorStat && (
        <Grid container justify='center'>
          <Message severity='error'>{'Σφάλμα'}</Message>
        </Grid>
      )}
      {successStat && (
        <>
          <Grid item>
            <Typography gutterBottom variant={matchesXS ? 'h4' : 'h3'}>
              Βαθμολογική κατάταξη
            </Typography>
          </Grid>
          <Grid item>
            <Button
              className={classes.deleteButton}
              onClick={() => {
                handleClickOpen();
              }}
            >
              <Icon>
                <span className='material-icons-outlined'>delete</span>
              </Icon>
            </Button>
          </Grid>
          <Grid
            item
            container
            direction='column'
            md={7}
            style={{ margin: '1em 0em' }}
          >
            <LiveQuizStatisticsTable
              liveQuizStat={liveQuizStat}
              liveQuizCategory={liveQuizCategory}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
}
