import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import logo from '../../assets/logo.svg';
import Copyright from './Copyright';
import Route from './Route';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { logout, userCheck } from '../../actions/authActions';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    marginBottom: '0.9em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '0.5em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '0.1em',
    },
    ...theme.mixins.toolbar,
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
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerIcon: {
    height: '50px',
    width: '50px',
    [theme.breakpoints.down('md')]: {
      height: '40px',
      width: '40px',
    },
    [theme.breakpoints.down('xs')]: {
      height: '30px',
      width: '30px',
    },
  },
  drawerIconContainer: {
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
    marginRight: 15,
  },
  drawerItem: {
    ...theme.typography.tab,
    opacity: 0.7,
  },
  drawerItemSelected: {
    '& .MuiListItemText-root': {
      opacity: '1',
    },
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  drawerButtonHidden: {
    display: 'none',
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

export default function Layout({ children, role }) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const [openDrawer, setOpenDrawer] = useState(false);
  const [value, setValue] = useState(0);

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
        dispatch(logout());
      }, remainigTime);
    }
    return () => {
      clearTimeout(logoutTimer);
      //console.log('clean');
    };
  }, [userInfo, dispatch]);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='absolute'
          className={clsx(classes.appBar, openDrawer && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar} disableGutters>
            <IconButton
              className={clsx(
                classes.drawer,
                openDrawer && classes.drawerButtonHidden
              )}
              aria-label='open drawer'
              onClick={() => setOpenDrawer(!openDrawer)}
              disableRipple
            >
              <MenuIcon className={classes.drawerIcon} />
            </IconButton>
            <Button
              component={Link}
              to={role === `/${role}` ? `/${role}` : ''}
              onClick={() => setValue(0)}
              disableRipple
              className={
                matchesSM
                  ? clsx(
                      classes.logoContainer,
                      openDrawer && classes.drawerButtonHidden
                    )
                  : classes.logoContainer
              }
            >
              <img alt='logo' className={classes.logo} src={logo} />
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant='permanent'
          classes={{
            paper: clsx(
              classes.drawerPaper,
              !openDrawer && classes.drawerPaperClose
            ),
          }}
          onClose={() => setOpenDrawer(false)}
          /* onOpen={() => setOpenDrawer(true)} */
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
              <ChevronLeftIcon />
            </IconButton>
          </div>

          <Route
            role={role}
            value={value}
            setValue={setValue}
            classes={classes}
            setOpenDrawer={setOpenDrawer}
          />
        </Drawer>
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
