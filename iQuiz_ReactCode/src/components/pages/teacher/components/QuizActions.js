import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Icon } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Button } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { listDclassSuggest } from '../../../../actions/suggestAction';
import SuggestModal from './SuggestModal';

const useStyles = makeStyles((theme) => ({
  continueButton: {
    ...theme.typography.secondaryButton,
    borderColor: theme.palette.common.blue,
    color: theme.palette.common.blue,
    height: 40,
    width: 270,
    marginLeft: '2.5em',
    [theme.breakpoints.down('md')]: {
      marginLeft: '1.5em',
      height: 50,
      width: 240,
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0em',
      height: 45,
      width: 200,
    },
  },
  paper: {
    padding: theme.spacing(4),
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
  },
  specialText: {
    color: theme.palette.common.orange,
  },
}));

export default function QuizActions(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const quizDetails = useSelector((state) => state.quizDetails);
  const quiz_id = quizDetails.quiz.id;

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Grid item container justify='center'>
      <Paper className={classes.paper}>
        <Grid item container direction='column'>
          <Grid item>
            <Typography variant={matchesSM ? 'h5' : 'h3'}>
              Περισσότερες Επιλογές:
            </Typography>
          </Grid>
          <Divider style={{ marginTop: '1em' }} />
          <Grid
            item
            container
            direction='row'
            justify='space-between'
            style={{ marginTop: '1em', marginBottom: '2em' }}
          >
            <Grid item>
              <ListItemIcon style={{ fontSize: '1em' }}>
                <Icon
                  style={{
                    marginRight: '0.5em',
                    color: '#ffeb3b',
                    fontSize: '2em',
                  }}
                >
                  done
                </Icon>
                <Typography variant='subtitle1'>Live Κουίζ</Typography>
              </ListItemIcon>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Button
                variant='outlined'
                className={classes.continueButton}
                component={Link}
                to={`/livegame/host/${quiz_id}`}
              >
                Δημιουργία Ψηφιακής Αίθουσας
              </Button>
            </Grid>
          </Grid>
          <Grid item container direction='row'>
            <Grid item>
              <ListItemIcon style={{ fontSize: '1em' }}>
                <Icon
                  style={{
                    marginRight: '0.5em',
                    color: '#ffeb3b',
                    fontSize: '2em',
                  }}
                >
                  done
                </Icon>
                <Typography variant='subtitle1'>Ψηφιακή Τάξη</Typography>
              </ListItemIcon>
            </Grid>
            <Grid item xs={12} sm={12} md={7}>
              <Button
                variant='contained'
                className={classes.continueButton}
                onClick={() => {
                  handleClickOpen();
                  dispatch(listDclassSuggest(quiz_id));
                }}
              >
                Ορισμός ως Προτεινόμενο
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <SuggestModal
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
        quiz_id={quiz_id}
      />
    </Grid>
  );
}
