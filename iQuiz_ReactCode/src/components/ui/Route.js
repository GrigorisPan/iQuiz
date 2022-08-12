import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Icon } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
  teacherRoutes,
  studentRoutes,
  adminRoutes,
  mainRoutes,
} from './routes';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';

import { logout } from '../../actions/authActions';

let routes = [];
export default function Route(props) {
  if (props.role === 'teacher') {
    routes = teacherRoutes;
  } else if (props.role === 'student') {
    routes = studentRoutes;
  } else {
    routes = adminRoutes;
  }

  const value = props.value;
  useEffect(() => {
    [...routes].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (value !== route.activeIndex) {
            props.setValue(route.activeIndex);
          }
          break;
        default:
          break;
      }
    });
  }, [value, props]);

  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <Divider />
      <List>
        {routes.map((route) => (
          <ListItem
            key={`${route}${route.activeIndex}`}
            button
            component={Link}
            to={route.link}
            selected={value === route.activeIndex}
            classes={{ selected: props.classes.drawerItemSelected }}
            onClick={() => {
              props.setOpenDrawer(false);
              props.setValue(route.activeIndex);
            }}
          >
            <ListItemIcon>
              <Icon>{route.icon}</Icon>
            </ListItemIcon>
            <ListItemText variant='body2' disableTypography>
              {' '}
              {route.name}
            </ListItemText>
          </ListItem>
        ))}
        <Divider />
        <List />
        {mainRoutes.map((route) => (
          <ListItem
            key={`${route}${route.activeIndex}`}
            button
            component={Link}
            to={route.link}
            selected={value === route.activeIndex}
            classes={{ selected: props.classes.drawerItemSelected }}
            onClick={() => {
              props.setOpenDrawer(false);
              props.setValue(route.activeIndex);
            }}
          >
            <ListItemIcon>
              <Icon>{route.icon}</Icon>
            </ListItemIcon>
            <ListItemText variant='body2' disableTypography>
              {' '}
              {route.name}
            </ListItemText>
          </ListItem>
        ))}
        <ListItem
          key={'1500'}
          button
          selected={value === 1500}
          classes={{ selected: props.classes.drawerItemSelected }}
          onClick={() => {
            props.setOpenDrawer(false);
            props.setValue(1500);
            dispatch(logout());
          }}
        >
          <ListItemIcon>
            <Icon>logout</Icon>
          </ListItemIcon>
          <ListItemText variant='body2' disableTypography>
            {' '}
            Αποσύνδεση
          </ListItemText>
        </ListItem>
      </List>
    </React.Fragment>
  );
}
