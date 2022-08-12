import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import eduIcon from '../../../assets/eduIcon.jpg';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    minHeight: '80vh',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundImage: `url(${eduIcon})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '27rem',
    [theme.breakpoints.down('md')]: {
      minHeight: '20rem',
    },
    [theme.breakpoints.down('xs')]: {
      minHeight: '15rem',
    },
  },
  moreButton: {
    ...theme.typography.mainButton,
    borderRadius: '50px',
    width: '250px',
    height: '45px',
    backgroundColor: theme.palette.common.orange,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  specialText: {
    color: theme.palette.common.orange,
  },
  titleText: {
    marginTop: '1em',
    [theme.breakpoints.down('md')]: {
      marginTop: '2em',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '1em',
    },
  },
  mainText: {
    textAlign: 'center',
    padding: '0.5em 3.5em',
    [theme.breakpoints.down('md')]: {
      padding: '0.5em 1.5em',
    },
  },
}));

export default function LandingPage() {
  const classes = useStyles();
  const theme = useTheme();

  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Grid container direction='row' className={classes.mainContainer}>
      <Grid
        item
        container
        direction='row'
        justify='center'
        alignItems='center'
        md={6}
      >
        <Grid item>
          <Typography
            variant={matchesXS ? 'h4' : 'h2'}
            align='center'
            className={classes.titleText}
          >
            Η <span className={classes.specialText}>Καλύτερη</span> εκπαιδευτική
            <br /> πλατφόρμα!
          </Typography>
          <Typography
            variant={matchesXS ? 'subtitle2' : 'subtitle1'}
            align='center'
            className={classes.mainText}
          >
            Η πλατφόρμα απευθύνεται σε μαθητές και εκπαιδευτικούς όλων των
            εκπαιδευτικών βαθμίδων προσφέροντας ευελιξία και προσαρμοστικότητα.
          </Typography>
        </Grid>
      </Grid>
      <Grid item container md={6} className={classes.iconContainer}></Grid>
    </Grid>
  );
}
