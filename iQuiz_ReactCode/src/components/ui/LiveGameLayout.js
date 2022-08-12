import React from 'react';
import Copyright from './Copyright';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#461a42',
    height: '100vh',
  },

  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

export default function LiveGameLayout({ children }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.root}>
        <main className={classes.content}>
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
