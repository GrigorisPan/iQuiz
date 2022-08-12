import React from 'react';

import { TextField, Button, FormControl } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Loader from '../../../ui/Loader';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    minHeight: '38em',
    maxHeight: '88vh',
    width: '35em',
    padding: '3em 1em',
    boxShadow: '0px 0px 8px 5px rgba(0,0,0,0.2)',
    borderRadius: '10px',
  },
  formControl: {
    minWidth: '11em',
    marginTop: '1.3em',
    [theme.breakpoints.down('sm')]: {
      marginTop: '0em',
    },
  },
  updateButton: {
    ...theme.typography.mainButton,
    borderRadius: '50px',
    width: '250px',
    height: '45px',
    marginTop: '5em',
    [theme.breakpoints.down('xs')]: {
      marginTop: '2em',
    },
    alignItems: 'center',
    backgroundColor: theme.palette.common.orange,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

export default function MainFormSt({
  setType,
  loading,
  setUsername,
  submitHandler,
  setEmail,
  setPassword,
  setConfirmPassword,
  username,
  email,
  selection,
  type,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Grid
      item
      container
      direction='column'
      alignItems='center'
      justify='center'
      className={classes.mainContainer}
    >
      <Grid item>
        <Typography
          variant={matchesXS ? 'h3' : 'h2'}
          style={{ lineHeight: 1 }}
          align='center'
        >
          Προφίλ
        </Typography>
        <Typography
          variant='body1'
          align='center'
          style={{ marginTop: '0.8em' }}
        >
          Επεξεργασία προσωπικών στοιχείων!
        </Typography>
      </Grid>
      <Grid item>
        <Grid item container direction='column'>
          <form onSubmit={submitHandler}>
            {selection && (
              <Grid item>
                <FormControl className={classes.formControl}>
                  <InputLabel id='type-user-select-label'>
                    Κατηγορία χρήστη
                  </InputLabel>
                  <Select
                    labelId='user-role-select-label'
                    id='role-select'
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <MenuItem value={2}>Εκπαιδευτικός</MenuItem>
                    <MenuItem value={0}>Εκπαιδευόμενος</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item>
              <TextField
                label='Όνομα χρήστη'
                id='name'
                value={username}
                style={{ marginTop: '1.3em' }}
                autoComplete='false'
                fullWidth
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label='Ηλεκτρονικό ταχυδρομείο'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginTop: '1.3em' }}
                fullWidth
                autoComplete='false'
              />
            </Grid>
            <Grid item>
              <TextField
                label='Κωδικός'
                id='password'
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginTop: '1.3em' }}
                fullWidth
                type='password'
                autoComplete='false'
              />
            </Grid>
            <Grid item>
              <TextField
                label='Επιβεβαίωση κωδικού'
                id='Confirm Password'
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ marginTop: '1.3em' }}
                fullWidth
                type='password'
                autoComplete='false'
              />
            </Grid>
            <Grid item>
              <Grid item container justify='center'>
                {loading && <Loader />}
                <Button
                  type='submit'
                  variant='contained'
                  className={classes.updateButton}
                >
                  Αποθήκευση
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
}
