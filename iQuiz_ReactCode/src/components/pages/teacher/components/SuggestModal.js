import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Message from '../../../ui/Message';
import Loader from '../../../ui/Loader';
import {
  addSuggestQuiz,
  addSuggestQuizClean,
  listDclassSuggestClean,
} from '../../../../actions/suggestAction';

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '0em 0.5em',
    padding: '1em 1em',
  },
  button: {
    ...theme.typography.secondaryButton,
    marginTop: theme.spacing(0),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  specialText: {
    color: theme.palette.common.orange,
  },
}));

export default function SuggestModal(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = props.handleClose;
  const open = props.open;
  const quiz_id = props.quiz_id;

  const [dClassId, setdClassId] = useState(undefined);

  const dispatch = useDispatch();

  const dClassAvalSuggest = useSelector((state) => state.dClassAvalSuggest);
  const { loading, dClassAval } = dClassAvalSuggest;

  const addSuggest = useSelector((state) => state.addSuggest);
  const { success, error } = addSuggest;

  const handleChange = (event) => {
    setdClassId(Number(event.target.value) || '');
  };

  const handleAdd = () => {
    dispatch(listDclassSuggestClean());
    dispatch(addSuggestQuiz({ class_id: dClassId, quiz_id }));
    setdClassId(undefined);
    setTimeout(() => {
      handleClose();
      dispatch(addSuggestQuizClean());
    }, 1500);
  };

  const handleBack = () => {
    dispatch(listDclassSuggestClean());
    dispatch(addSuggestQuizClean());
    setdClassId(undefined);
    handleClose();
  };

  return (
    <Grid item container justify='center'>
      <Dialog
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            alignItems: 'center',
            paddingTop: '1em',
            paddingBottom: '1em',
            paddingLeft: '1.5em',
            paddingRight: '1.5em',
            marginRight: '0.5em',
            marginLeft: '0.5em',
          },
        }}
      >
        <DialogTitle
          disableTypography
          style={{ alignItems: 'center', padding: '1em 0.5em' }}
        >
          <Typography
            gutterBottom
            variant={matchesSM ? 'h4' : 'h3'}
            style={{ padding: '0em' }}
          >
            Επίλεξε <span className={classes.specialText}>Ψηφιακή Τάξη</span>
          </Typography>
        </DialogTitle>
        {loading ? (
          <Loader />
        ) : success ? (
          <Grid container justify='center'>
            <Message severity='success'>{'Επιτυχία'}</Message>
          </Grid>
        ) : error ? (
          <Grid container justify='center'>
            <Message severity='error'>{'Σφάλμα'}</Message>
          </Grid>
        ) : (
          <DialogContent
            style={{ alignSelf: 'center', width: '180px', margin: '0em 1em' }}
          >
            <Box component='form' sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <FormControl
                fullWidth
                style={{
                  textAlign: 'center',
                }}
              >
                <InputLabel htmlFor='ids-dialog-native'>Κωδικός</InputLabel>
                <Select
                  style={{ textAlignLast: 'center', marginTop: '1em' }}
                  native
                  value={dClassId}
                  onChange={handleChange}
                >
                  <option aria-label='None' value='' />
                  {dClassAval.map((dClassId) => (
                    <option value={dClassId} key={dClassId}>
                      {dClassId}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
        )}

        <DialogActions style={{ margin: '0.5em 1em' }}>
          <div className={classes.buttons}>
            <Button
              className={classes.button}
              color='primary'
              onClick={handleBack}
            >
              Πίσω
            </Button>
            <Button
              className={classes.button}
              variant='contained'
              color='primary'
              onClick={handleAdd}
              disabled={!dClassId ? true : false}
            >
              Ορισμός
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
