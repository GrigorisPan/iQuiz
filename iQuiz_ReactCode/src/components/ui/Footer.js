import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import footerAdornment from '../../assets/Footer Adornment.svg';
import facebook from '../../assets/facebook.svg';
import twitter from '../../assets/twitter.svg';
import instagram from '../../assets/instagram.svg';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.common.blue,
    width: '100%',
    zIndex: 1302,
    position: 'relative',
    marginTop: '1.5rem',
  },
  adornment: {
    width: '14em',
    verticalAlign: 'bottom',
    [theme.breakpoints.down('md')]: {
      width: '14em',
    },
    [theme.breakpoints.down('xs')]: {
      width: '10em',
    },
  },
  icon: {
    height: '2.5em',
    width: '2.1em',
    [theme.breakpoints.down('md')]: {
      height: '2em',
      width: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      height: '1.5em',
      width: '1.5em',
    },
  },
  socialContainer: {
    position: 'absolute',
    marginTop: '-4.5em',
    [theme.breakpoints.down('md')]: {
      marginTop: '-4em',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '-3.5em',
    },
    right: '3em',
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <img
        alt='decorative slash'
        src={footerAdornment}
        className={classes.adornment}
      />
      <Grid
        container
        justify='flex-end'
        spacing={3}
        className={classes.socialContainer}
      >
        <Grid
          item
          component={'a'}
          href='https://www.facebook.com/'
          rel='noopener noreferrer'
          target='blank'
        >
          <img alt='facebook' src={facebook} className={classes.icon} />
        </Grid>
        <Grid
          item
          component={'a'}
          href='https://www.twitter.com'
          rel='noopener noreferrer'
          target='blank'
        >
          <img alt='twitter' src={twitter} className={classes.icon} />
        </Grid>
        <Grid
          item
          component={'a'}
          href='https://www.instagram.com'
          rel='noopener noreferrer'
          target='blank'
        >
          <img alt='instagram' src={instagram} className={classes.icon} />
        </Grid>
      </Grid>
    </footer>
  );
}
