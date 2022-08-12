import React from 'react';
import { Link } from 'react-router-dom';

import { Icon } from '@material-ui/core';
import { Grid, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  optionCard: {
    ...theme.typography.mainButton,
    color: '#fff',
    fontWeight: 500,
    overflowWrap: ' breakWord',
    wordBreak: 'breakWord',
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
    borderRadius: '0.3rem',
    width: '100%',
    minHeight: 'auto',
    maxHeight: '100%',
    '&:last-child': {
      paddingBottom: 0,
    },
    '&:hover': {
      cursor: 'pointer',
      transform: 'translateY(-0.1rem)',
      transition: 'transform 150ms',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '1.3rem',
      marginBottom: '0.3rem',
    },
  },
  optionCardContent: {
    '&:last-child': {
      padding: '16px',
    },
    [theme.breakpoints.down('md')]: {
      '&:last-child': {
        padding: '10px',
      },
    },
  },
  quizActionsButton: {
    ...theme.typography.mainButton,
    color: theme.palette.common.blue,
    height: 40,
    width: 40,
    margin: '0.2em 0.5em',
    [theme.breakpoints.down('md')]: {
      height: 35,
      width: 35,
    },
    [theme.breakpoints.down('sm')]: {
      height: 30,
      width: 30,
    },
  },
}));
const optionsLetters = ['A', 'B', 'C', 'D', 'E'];
const colorArray = ['#2f6dae', '#2c9ca6', '#eca82c', '#ba2f47', '#66994D'];

export default function GameData({
  hostId,
  isPaused,
  isVisible,
  showCorrect,
  options,
  controlTimer,
  controlVisible,
  controlShowCorrect,
}) {
  const classes = useStyles();

  return (
    <>
      <Grid item container justify='space-around' style={{ marginTop: '1em' }}>
        <Grid item>
          <Button
            variant='contained'
            style={{ color: '#eca82c' }}
            component={Link}
            target='_blank'
            to={`/livegame/leaderboard/${hostId}`}
            className={classes.quizActionsButton}
          >
            <Icon>
              <span className='material-icons-outlined'>leaderboard</span>
            </Icon>
          </Button>
          <Button
            variant='contained'
            style={{ color: '#ff1744' }}
            className={classes.quizActionsButton}
            onClick={() => {
              controlVisible();
            }}
          >
            <Icon>
              <span className='material-icons-outlined'>
                {isVisible ? 'visibility_off' : 'visibility'}
              </span>
            </Icon>
          </Button>
          <Button
            className={classes.quizActionsButton}
            style={{ background: '#e0e0e0' }}
            onClick={() => {
              controlTimer();
            }}
          >
            <Icon>
              <span className='material-icons-outlined'>
                {isPaused ? 'play_arrow' : 'pause'}
              </span>
            </Icon>
          </Button>
          <Button
            variant='contained'
            style={{ color: '#4caf50' }}
            className={classes.quizActionsButton}
            onClick={() => {
              controlShowCorrect();
            }}
          >
            <Icon>
              <span className='material-icons-outlined'>
                {showCorrect ? 'clear' : 'check'}
              </span>
            </Icon>
          </Button>
        </Grid>
      </Grid>

      <Grid
        item
        container
        justify='center'
        style={{ color: '#ee6600', margin: '1em 0em' }}
      >
        {isVisible && (
          <Grid
            item
            container
            className={classes.fixedHeightPaper}
            justify='center'
            direction='column'
            lg={12}
            xl={9}
          >
            {options.map((option, i) => (
              <Card
                key={i}
                className={classes.optionCard}
                style={{ backgroundColor: `${colorArray[i]}` }}
              >
                <CardContent className={classes.optionCardContent}>
                  {optionsLetters[i]}: {option}
                </CardContent>
              </Card>
            ))}
          </Grid>
        )}
      </Grid>
    </>
  );
}
