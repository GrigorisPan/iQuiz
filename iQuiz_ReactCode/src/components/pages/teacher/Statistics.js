import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import ButtonArrow from '../../ui/ButtonArrow';
import Divider from '@material-ui/core/Divider';

import { getStatistics } from '../../../actions/statisticsAction';
import StatisticsCard from './components/StatisticsCard';
import Loader from '../../ui/Loader';
import Message from '../../ui/Message';
import { Pagination } from '../../ui/Pagination';
import {
  reportDelete,
  reportDeleteClean,
} from '../../../actions/reportActions';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    minHeight: '100vh',
  },
  specialText: {
    color: theme.palette.common.orange,
  },
  continueButton: {
    ...theme.typography.secondaryButton,
    borderColor: theme.palette.common.blue,
    color: theme.palette.common.blue,
    height: 40,
    width: 145,
  },
}));

export default function Statistics() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const quizStatistics = useSelector((state) => state.quizStatistics);
  const { loading, error, statistics } = quizStatistics;

  const reportDeleted = useSelector((state) => state.reportDeleted);
  const { success: successDelete } = reportDeleted;

  let indexOfLast = 1;
  let indexOfFirst = 1;
  let currentStatistics = [];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getStatistics());
  }, [dispatch]);

  if (!error) {
    // Get current quiz
    indexOfLast = currentPage * itemsPerPage;
    indexOfFirst = indexOfLast - itemsPerPage;
    currentStatistics = statistics.slice(indexOfFirst, indexOfLast);
  }

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //Delete function
  const deleteHandler = (id) => {
    dispatch(reportDelete(id));
    setShow(true);
    setTimeout(() => {
      dispatch(getStatistics());
      setShow(false);
      dispatch(reportDeleteClean());
    }, 1000);
  };

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      className={classes.mainContainer}
    >
      <Grid item>
        <Typography
          gutterBottom
          variant={matchesXS ? 'h4' : 'h3'}
          align='center'
          style={{
            marginBottom: '1em',
          }}
        >
          Αποτελέσματα των{' '}
          <span className={classes.specialText}>Live Κουίζ</span>
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          gutterBottom
          variant='h6'
          align='center'
          style={{
            marginBottom: '1em',
          }}
        >
          Δες την βαθμολογική κατάταξη των παικτών{' '}
        </Typography>
      </Grid>
      <Grid item align='center'>
        <Button
          className={classes.continueButton}
          component={Link}
          to={`/teacher/statistics/livequiz`}
          variant='outlined'
        >
          Συνέχεια
          <ButtonArrow
            width={15}
            height={15}
            fill={theme.palette.common.blue}
          />
        </Button>
      </Grid>
      <Divider
        style={{
          marginTop: '2em',
          marginBottom: '2em',
          width: '90%',
        }}
      />
      <Grid item>
        <Typography
          gutterBottom
          variant={matchesXS ? 'h4' : 'h3'}
          align='center'
          style={{
            marginBottom: '1em',
          }}
        >
          Στατιστικά Δεδομένα των{' '}
          <span className={classes.specialText}>Κουίζ</span>
        </Typography>
      </Grid>
      {successDelete && show && (
        <Grid container justify='center' style={{ marginBottom: '0.5em' }}>
          <Message severity='success'>Επιτυχής διαγραφή!</Message>
        </Grid>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Grid container justify='center'>
          <Message severity='info'>{error}</Message>
        </Grid>
      ) : (
        <Grid item container spacing={3} justify='center'>
          {currentStatistics.map((statistic) => (
            <StatisticsCard
              key={statistic.id}
              statistic={statistic}
              deleteHandler={deleteHandler}
            />
          ))}
          <Grid item container justify='center'>
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={statistics.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
