import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/Appbar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import logo from '../../assets/logo.svg';
import IconButton from '@material-ui/core/IconButton';

function ElevationScroll(props) {
  const { children } = props;
  // trigger:this uses the use scroll trigger hook from material UI which essentially is an event listener for when the user is scrolling.
  //disable hysteresis: that means is whether or not there's a little delay when the user is scrolling.
  //threshold: t defaults to 100 that number controls how far the user has to start scrolling before it triggers this event listener and so with a zero.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  //A new version of whatever component you are wrapping with elevation scroll it clones the children and returns a new copy of that element with a new elevation depending on whether or not the trigger has been set.
  //if our event listener has set this trigger then it will have an elevation of 4.That is our floating state.Otherwise it will remain flat.
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

//Inline Custom Style
const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '2em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '1.5em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1em',
    },
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
  tabContainer: {
    marginLeft: 'auto',
    marginRight: '7em',
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px',
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
    width: '240px',
  },
  drawerItem: {
    ...theme.typography.tab,
    color: 'white',
    opacity: '0.7',
  },
  drawerItemSelected: {
    '& .MuiListItemText-root': {
      opacity: '1',
    },
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1,
  },
}));

const routes = [
  { name: 'Αρχική', link: '/', activeIndex: 0 },
  { name: 'Είσοδος', link: '/login', activeIndex: 1 },
  { name: 'Εγγραφή', link: '/signup', activeIndex: 2 },
];

//Toolbar: helps to layout everything  horizontal.
//position in AppBar can take values: static or fixed (default).
export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const [openDrawer, setOpenDrawer] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    [...routes].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (value !== route.activeIndex) {
            setValue(route.activeIndex);
          }
          break;
        default:
          break;
      }
    });
  }, [value]);

  const tabs = (
    <React.Fragment>
      <Tabs
        className={classes.tabContainer}
        value={value}
        onChange={handleChange}
      >
        {routes.map((route, index) => (
          <Tab
            key={`${route}${index}`}
            className={classes.tab}
            component={Link}
            to={route.link}
            label={route.name}
          />
        ))}
      </Tabs>
    </React.Fragment>
  );

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }} //Override basic material components style
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {routes.map((route) => (
            <ListItem
              divider
              key={`${route}${route.activeIndex}`}
              button
              component={Link}
              to={route.link}
              selected={value === route.activeIndex}
              classes={{ selected: classes.drawerItemSelected }}
              onClick={(e) => {
                setOpenDrawer(false);
                setValue(route.activeIndex);
              }}
            >
              <ListItemText className={classes.drawerItem} disableTypography>
                {route.name}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={(e) => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position='fixed' className={classes.appbar}>
          <Toolbar disableGutters>
            <Button
              component={Link}
              to='/'
              disableRipple
              className={classes.logoContainer}
              onClick={(e) => setValue(0)}
            >
              <img alt='logo' className={classes.logo} src={logo} />
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}
