import React from 'react';
import { useHistory } from 'react-router-dom';

import FormControl from '@material-ui/core/FormControl';
import { Grid, Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import MuiMenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import MuiInputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
import { styled } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

const useStyles = makeStyles((theme) => ({
  card: {
    overflow: 'hidden',
    background: 'none',
    padding: '1em 2em',
  },
  cardMedia: {
    height: '100%',
    width: '50%',
  },
  formControl: {
    minWidth: '11em',
    fontSize: '1.4em',
    margin: '0.8em 0.5em',
    [theme.breakpoints.down('md')]: {
      marginTop: '0.5em',
    },
  },

  startButton: {
    ...theme.typography.mainButton,
    fontSize: '1.4rem',
    marginBottom: '1rem',
    borderRadius: '0.3rem',
    width: '100%',
    height: '40px',
    alignItems: 'center',
    backgroundColor: '#333333',
    '&:hover': {
      cursor: 'pointer',
      transform: 'translateY(-0.1rem)',
      transition: 'transform 150ms',
      backgroundColor: '#3d3d3d',
    },
  },
  backButton: {
    ...theme.typography.mainButton,
    fontSize: '1.4rem',
    marginBottom: '0.8rem',
    borderRadius: '0.3rem',
    width: '100%',
    height: '40px',
    alignItems: 'center',
    color: '#fff',
    backgroundColor: '#ff4e4e',
    '&:hover': {
      backgroundColor: '#f85555',
      cursor: 'pointer',
      transform: 'translateY(-0.1rem)',
      transition: 'transform 150ms',
    },
  },
}));

const MenuItem = withStyles({
  root: {
    color: '#0B72b9',
    fontWeight: '500',
  },
})(MuiMenuItem);

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(4),
    color: '#0B72b9',
    fontWeight: 400,
    fontSize: '1em',
  },
  '& .MuiInputBase-input': {
    borderRadius: 8,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 8,
      borderColor: '#0B72b9',
      boxShadow: '0 0 0 0.1rem #fff',
    },
  },
}));

const InputLabel = withStyles({
  root: {
    color: '#fff',
    fontWeight: '400',
    fontSize: '1.1em',
  },
})(MuiInputLabel);

export default function SettingsCard({
  gameCategory,
  setGameCategory,
  gameTime,
  setGameTime,
  numFailQuota,
  setNumFailQuota,
  startHandler,
  feedbackHandler,
  failQuotaHandler,
  feadbackChecked,
  failQuotaChecked,
  handleClickOpen,
}) {
  const classes = useStyles();
  let history = useHistory();

  return (
    <Card className={classes.card} elevation={5}>
      <Grid item container justify='space-around'>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id='type-user-select-label' required={true}>
              Κατηγορία
            </InputLabel>
            <Select
              labelId='user-role-select-label'
              id='role-select'
              value={gameCategory}
              input={<BootstrapInput />}
              onChange={(e) => {
                setGameCategory(e.target.value);
              }}
            >
              <MenuItem value={1}>Point System</MenuItem>
              <MenuItem value={2}>Point System - NP</MenuItem>
              <MenuItem value={3}>Simple Game</MenuItem>
              <MenuItem value={4}>Simple Game - NP</MenuItem>
              <MenuItem value={5}>Buzzer Mode</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id='type-user-select-label' required={true}>
              Χρόνος
            </InputLabel>
            <Select
              labelId='user-role-select-label'
              id='role-select'
              value={gameTime}
              input={<BootstrapInput />}
              onChange={(e) => setGameTime(e.target.value)}
            >
              <MenuItem value={15}>15s</MenuItem>
              <MenuItem value={20}>20s</MenuItem>
              <MenuItem value={25}>25s</MenuItem>
              <MenuItem value={30}>30s</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {failQuotaChecked && gameCategory !== 1 && gameCategory !== 2 && (
          <Grid item>
            <FormControl className={classes.formControl}>
              <InputLabel id='type-user-select-label' required={true}>
                Επιτρεπόμενα λάθη
              </InputLabel>
              <Select
                labelId='user-role-select-label'
                id='role-select'
                value={numFailQuota}
                input={<BootstrapInput />}
                onChange={(e) => setNumFailQuota(e.target.value)}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )}
      </Grid>
      <Grid
        item
        container
        direction='row'
        justify='center'
        style={{ margin: '0.5em ' }}
      >
        <FormGroup classes={classes.checkbox}>
          <FormControlLabel
            label={
              <Typography
                component='span'
                variant='body1'
                style={{ color: '#ffff' }}
              >
                Feedback
              </Typography>
            }
            variant='h2'
            control={
              <Checkbox
                style={{ color: '#ffff' }}
                checked={feadbackChecked}
                onChange={feedbackHandler}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
          />
        </FormGroup>
        {gameCategory !== 1 && gameCategory !== 2 && (
          <FormGroup classes={classes.checkbox}>
            <FormControlLabel
              label={
                <Typography
                  component='span'
                  variant='body1'
                  style={{ color: '#ffff' }}
                >
                  Fail Quota
                </Typography>
              }
              variant='h2'
              control={
                <Checkbox
                  style={{ color: '#ffff' }}
                  checked={failQuotaChecked}
                  onChange={failQuotaHandler}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
            />
          </FormGroup>
        )}
      </Grid>
      <Button
        className={classes.startButton}
        variant='contained'
        onClick={() => {
          handleClickOpen();
        }}
      >
        Έναρξη
      </Button>
      <Button
        className={classes.backButton}
        variant='contained'
        onClick={() => {
          history.push(`/`);
        }}
      >
        Έξοδος
      </Button>
    </Card>
  );
}
