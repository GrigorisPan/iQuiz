import React from 'react';

import { Grid, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  optionButton: {
    ...theme.typography.mainButton,
    color: '#fff',
    fontWeight: 500,
    fontSize: '1.8rem',
    marginBottom: '1rem',
    borderRadius: '0.3rem',
    width: '100%',
    minHeight: 'auto',
    maxHeight: '100%',
    '&:hover': {
      cursor: 'pointer',
      transform: 'translateY(-0.1rem)',
      transition: 'transform 150ms',
    },
  },
}));

const options = ['A', 'B', 'C', 'D', 'E'];
const colorArray = ['#2f6dae', '#2c9ca6', '#eca82c', '#ba2f47', '#66994D'];

export default function GameOptions({ answerSubmitted }) {
  const classes = useStyles();

  return (
    <Grid
      item
      container
      className={classes.fixedHeightPaper}
      justify='center'
      direction='column'
      style={{ color: '#ee6600', margin: '1em 1em' }}
      sm={12}
      md={10}
      lg={9}
      xl={8}
    >
      {options.map((option, i) => (
        <Button
          key={i}
          variant='contained'
          className={classes.optionButton}
          style={{ backgroundColor: `${colorArray[i]}` }}
          onClick={() => {
            answerSubmitted(option);
          }}
        >
          {option}
        </Button>
      ))}
    </Grid>
  );
}
