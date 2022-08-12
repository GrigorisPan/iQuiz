import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Icon } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {
  digitalClassClean,
  digitalClassCreateClean,
  digitalClassNew,
  getDigitalClassList,
} from '../../../actions/digitalClassActions';
import DigitalClassCard from './components/DigitalClassCard';
import { Pagination } from '../../ui/Pagination';
import CreateClassModal from './components/CreateClassModal';
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

export default function DigitalClass() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('sm'));

  let indexOfLast = 1;
  let indexOfFirst = 1;
  let currentdClasses = [];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const digitalClassList = useSelector((state) => state.digitalClassList);
  const { loading, error, dClasses } = digitalClassList;

  const digitalClassCreate = useSelector((state) => state.digitalClassCreate);
  const err = digitalClassCreate.error;
  const success = digitalClassCreate.success;

  useEffect(() => {
    dispatch(getDigitalClassList());
    dispatch(digitalClassClean());
    if (err) {
      setShow('true');
      setTimeout(() => {
        setShow(false);
      }, 1500);
    }
    if (success) {
      setOpen(false);
      setShow(true);
      setTimeout(() => {
        dispatch(digitalClassCreateClean());
        setShow(false);
        setTitle('');
        setDescription('');
      }, 1500);
    }
  }, [dispatch, err, success]);

  const createHandler = () => {
    dispatch(digitalClassNew({ title, description }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };
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
      <Grid item xs={12}>
        <Typography
          gutterBottom
          variant={matchesXS ? 'h4' : 'h3'}
          style={{
            marginBottom: '1em',
          }}
        >
          Δημιούργησε τώρα μια{' '}
          <span className={classes.specialText}>Ψηφιακή Τάξη</span>
        </Typography>
        <Grid item align='center'>
          <Button onClick={handleClickOpen}>
            <Icon
              style={{
                color: '#6fbf73',
                fontSize: '3em',
              }}
            >
              <span>add_box</span>
            </Icon>
          </Button>
        </Grid>
      </Grid>
      {show && success && (
        <Grid item container justify='center' style={{ marginBottom: '1em' }}>
          <Message severity='success'>Δημιουργήθηκε ψηφιακή τάξη</Message>
        </Grid>
      )}
      {
        <CreateClassModal
          open={open}
          setOpen={setOpen}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          show={show}
          setShow={setShow}
          createHandler={createHandler}
          handleClose={handleClose}
        />
      }
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
            <DigitalClassCard key={dclass.id} dclass={dclass} />
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
