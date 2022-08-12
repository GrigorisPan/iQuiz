import React, { useEffect } from 'react';
import logo from '../../assets/logo.svg';
import Copyright from './Copyright';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';

import { logout, userCheck, userInfoRefresh } from '../../actions/authActions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#493a87',
  },
  toolbar: {
    paddingRight: 24,
    backgroundColor: '#493a87',
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
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(4),
  },
}));
let logoutTimer;
export default function GameLayout({ children, role }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const authCheck = useSelector((state) => state.authCheck);
  const { userInfoCheck, error } = authCheck;
  const authLogin = useSelector((state) => state.authLogin);
  const { userInfo } = authLogin;

  useEffect(() => {
    dispatch(userCheck());
  }, [dispatch]);

  useEffect(() => {
    if (userInfoCheck) {
      if (
        userInfoCheck.type !== +userInfo.type ||
        userInfoCheck.id !== +userInfo.id
      ) {
        dispatch(logout());
      }
    }
    if (error || !userInfo) {
      dispatch(logout());
    }
  }, [error, userInfoCheck, dispatch, userInfo]);

  useEffect(() => {
    if (userInfo) {
      const tokenExpirationDate = new Date(userInfo.expiration);
      const remainigTime = tokenExpirationDate.getTime() - new Date().getTime();
      //console.log(tokenExpirationDate, remainigTime);
      logoutTimer = setTimeout(() => {
        dispatch(userInfoRefresh());
      }, remainigTime);
    }
    return () => {
      clearTimeout(logoutTimer);
      //console.log('clean');
    };
  }, [userInfo, dispatch]);

  //const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

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
          <Container
            maxWidth={role === 'admin' ? 'xl' : 'lg'}
            className={classes.container}
          >
            <div>{children}</div>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    </React.Fragment>
  );
}
