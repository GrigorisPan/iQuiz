import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { digitalClassCreateClean } from '../../../../actions/digitalClassActions';
import Loader from '../../../ui/Loader';
import Message from '../../../ui/Message';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  loginButton: {
    ...theme.typography.mainButton,
    borderRadius: '50px',
    width: '240px',
    height: '40px',
    alignItems: 'center',
    backgroundColor: theme.palette.common.orange,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  specialText: {
    color: theme.palette.common.orange,
  },
  button: {
    ...theme.typography.secondaryButton,
    color: theme.palette.common.blue,
  },
}));

export default function CreateClassModal({
  open,
  setOpen,
  title,
  setTitle,
  description,
  setDescription,
  show,
  createHandler,
  handleClose,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('sm'));

  const digitalClassCreate = useSelector((state) => state.digitalClassCreate);
  const err = digitalClassCreate.error;
  const load = digitalClassCreate.loading;

  const dispatch = useDispatch();

  const handleBack = () => {
    setOpen(false);
    setTitle('');
    setDescription('');
    dispatch(digitalClassCreateClean());
  };

  return (
    <Dialog
      disableEscapeKeyDown
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          paddingTop: matchesXS ? '1em' : '2em',
          paddingBottom: matchesXS ? '1em' : '2em',
          paddingLeft: matchesXS ? '1em' : '0.5em',
          paddingRight: matchesXS ? '1em' : '0.5em',
        },
      }}
    >
      <DialogContent>
        {show && err && (
          <Grid item container justify='center'>
            <Message severity='error'>{err} </Message>
          </Grid>
        )}
        <Grid container direction='column'>
          <Typography
            gutterBottom
            variant={matchesXS ? 'h4' : 'h3'}
            style={{
              marginBottom: '1em',
              textAlign: 'center',
              marginTop: '0.5em',
            }}
          >
            Δημιουργία{' '}
            <span className={classes.specialText}>Ψηφιακής Τάξης</span>
          </Typography>
          <Grid
            item
            container
            justify='center'
            alignItems='center'
            direction='column'
            spacing={5}
          >
            <Grid item>
              <TextField
                required
                label='Τίτλος'
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoComplete='false'
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                required
                label='Περιγραφή'
                id='Περιγραφή'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                fullWidth
                rows={4}
                variant='filled'
              />
            </Grid>
          </Grid>
          {load && <Loader />}
          <Grid
            item
            container
            alignItems='center'
            justify='center'
            direction='row'
            style={{
              marginTop: '2em',
            }}
          >
            <Grid item>
              <Button onClick={handleBack} className={classes.button}>
                Πίσω
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                className={classes.loginButton}
                onClick={createHandler}
              >
                Δημοσίευση
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
