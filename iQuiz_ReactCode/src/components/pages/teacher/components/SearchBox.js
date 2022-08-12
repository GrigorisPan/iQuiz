import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 300,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
  },
}));

export default function SearchBox({ history, role }) {
  const classes = useStyles();

  const [searched, setSeached] = useState('');

  const requestSearch = (e) => {
    e.preventDefault();
    if (searched.trim()) {
      history.push(`/${role}/search/${searched}`);
    } else {
      history.push('/');
    }
    return;
  };

  return (
    <Grid item container justify='center'>
      <form onSubmit={requestSearch}>
        <Paper className={classes.search}>
          <InputBase
            className={classes.input}
            placeholder='Αναζήτηση'
            inputProps={{ 'aria-label': 'Search Quiz' }}
            onChange={(e) => setSeached(e.target.value)}
          />
          <IconButton
            type='submit'
            aria-label='search'
            className={classes.iconButton}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </form>
    </Grid>
  );
}
