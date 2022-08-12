import React from 'react';
import logo from '../../assets/logo.svg';
import Copyright from './Copyright';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#461a42',
  },

  toolbar: {
    paddingRight: 24,
    backgroundColor: '#461a42',
  },
  logo: {
    height: '5.5em',
    [theme.breakpoints.down('md')]: {
      height: '5em',
    },
    [theme.breakpoints.down('xs')]: {
      height: '4em',
    },
  },
  logoContainer: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },

  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(1),
  },
}));

export default function LiveGameClientLayout({ children }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position='absolute'>
          <Toolbar className={classes.toolbar} disableGutters>
            <Button disableRipple className={classes.logoContainer}>
              <img alt='logo' className={classes.logo} src={logo} />
            </Button>
          </Toolbar>
        </AppBar>

        <main className={classes.content}>
          <div className={classes.toolbarMargin} />
          <Container maxWidth='lg' className={classes.container}>
            <div>{children}</div>
            <Box pt={1}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    </React.Fragment>
  );
}
