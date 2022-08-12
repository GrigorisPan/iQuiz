import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '70%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    marginTop: '2em',
    justifyContent: 'center',
  },
}));

export default function Message({ severity, children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity={severity}>{children}</Alert>
    </div>
  );
}
