import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {
  digitalClassClean,
  getDigitalClassList,
} from '../../../actions/digitalClassActions';
import DigitalClassCardSt from './components/DigitalClassCardSt';
import DigitalClassSubFormSt from './components/DigitalClassSubFormSt';
import { Pagination } from '../../ui/Pagination';
import Loader from '../../ui/Loader';
import Message from '../../ui/Message';

const useStyles = makeStyles((theme) => ({
  specialText: {
    color: theme.palette.common.orange,
  },
  button: {
    ...theme.typography.secondaryButton,
    color: theme.palette.common.blue,
  },
  makeStyles: {
    root: {
      width: '100%',
    },
  },
}));

export default function DigitalClassSt() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('sm'));

  let indexOfLast = 1;
  let indexOfFirst = 1;
  let currentdClasses = [];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const dispatch = useDispatch();

  const digitalClassList = useSelector((state) => state.digitalClassList);
  const { loading, error, dClasses } = digitalClassList;

  const digitalClassEnroll = useSelector((state) => state.digitalClassEnroll);
  const { success } = digitalClassEnroll;

  useEffect(() => {
    if (success) {
      dispatch(getDigitalClassList());
    }
  }, [dispatch, success]);

  useEffect(() => {
    dispatch(getDigitalClassList());
    dispatch(digitalClassClean());
  }, [dispatch]);

  if (!error) {
    // Get current digital classes
    indexOfLast = currentPage * itemsPerPage;
    indexOfFirst = indexOfLast - itemsPerPage;
    currentdClasses = dClasses.slice(indexOfFirst, indexOfLast);
  }

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      className={classes.root}
    >
      <Grid container item justify='center'>
        <Grid item container xs={12} justify='center'>
          <Typography
            gutterBottom
            variant={matchesXS ? 'h4' : 'h3'}
            style={{
              marginBottom: '0.5em',
            }}
          >
            Εγγραφή σε <span className={classes.specialText}>Ψηφιακή Τάξη</span>
          </Typography>
        </Grid>
        <Grid item container justify='center' xs={12} sm={10}>
          <DigitalClassSubFormSt />
        </Grid>
      </Grid>
      {/* {show && (
        <Grid item container justify='center' style={{ marginBottom: '1em' }}>
          <Message severity='success'>Επιτυχής εγγραφή</Message>
        </Grid>
      )} */}

      <Grid item container xs={12} justify='center'>
        <Divider
          style={{
            marginTop: '2em',
            marginBottom: '2em',
            width: '90%',
          }}
        />
        <Typography
          variant='h4'
          style={{
            marginBottom: '2em',
          }}
        >
          Οι Ψηφιακές σου <span className={classes.specialText}> Τάξεις</span>
        </Typography>
      </Grid>
      {loading ? (
        <Loader />
      ) : error ? (
        <Grid container justify='center'>
          <Message severity='error'>{error}</Message>
        </Grid>
      ) : !dClasses ? (
        <Grid container justify='center'>
          <Message severity='info'>Δεν υπάρχουν ψηφιακές τάξεις</Message>
        </Grid>
      ) : (
        <Grid item container justify='center'>
          {currentdClasses.map((dclass) => (
            <DigitalClassCardSt key={dclass.id} dclass={dclass} />
          ))}
          <Grid item container justify='center'>
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={dClasses.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
