import React from 'react';

import { Grid, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Icon } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  exitButton: {
    ...theme.typography.mainButton,
    padding: '0em 0em',
    color: '#cdcd00',
    '&:hover': {
      backgroundColor: '#cdcd00',
      color: '#fff',
    },
  },
  banButton: {
    ...theme.typography.mainButton,
    padding: '0em 0em',
    color: '#ff4569',
    '&:hover': {
      backgroundColor: '#ff4569',
      color: '#fff',
    },
  },
  nameText: {
    color: '#333',
    fontWeight: '500',
  },
  numberText: {
    color: '#484848',
    fontWeight: '500',
    margin: '0em',
    paddingBottom: '0em',
  },
  scoreText: {
    color: '#461a42 ',
    fontWeight: '500',
    margin: '0em',
    paddingBottom: '0em',
  },
  divider: {
    width: '70%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  paper: {
    minHeight: '25em',
    minWidth: '40em',
    width: 'auto',
    maxHeight: '25em',
    maxWidth: '40em',
    /* overflowX:'hidden', */
    overflow: 'auto', //auto
    paddingLeft: '1em',
    paddingTop: '0.5em',
    [theme.breakpoints.down('lg')]: {
      minHeight: '20em',
      minWidth: '35em',
    },
    [theme.breakpoints.down('md')]: {
      minHeight: '10em',
      minWidth: '25em',
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: '5em',
      minWidth: '15em',
    },
  },
}));

export default function LobbyCard({ players, kickHandler, banHandler }) {
  const classes = useStyles();
  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <Grid item>
        <Paper elevation={6} className={classes.paper}>
          <Grid item container justify='center'>
            {players.map((player, i) => {
              if (player.name) {
                return (
                  <Grid
                    key={i}
                    item
                    container
                    direction='row'
                    justify={matchesSM ? 'space-between' : 'center'}
                  >
                    <Grid item xs={1}>
                      <Grid
                        item
                        container
                        direction='column'
                        alignItems='flex-start'
                      >
                        <Grid item>
                          <Typography
                            gutterBottom
                            variant='subtitle1'
                            className={classes.numberText}
                          >
                            {i + 1}
                            {')'}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={11} sm={10} md={8}>
                      <Grid
                        item
                        container
                        direction='column'
                        alignItems='flex-start'
                        style={{ marginRight: '5em' }}
                      >
                        <Grid item>
                          <Typography
                            gutterBottom
                            variant='subtitle1'
                            className={classes.nameText}
                          >
                            {player.name}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={1} md={3}>
                      <Grid item container direction='row' justify='flex-end'>
                        <Grid item>
                          <Button
                            className={classes.exitButton}
                            onClick={() => kickHandler(player.playerId)}
                          >
                            <Icon>
                              <span className='material-icons-outlined'>
                                logout
                              </span>
                            </Icon>
                          </Button>
                          <Button
                            className={classes.banButton}
                            onClick={() => banHandler(player.playerId)}
                          >
                            <Icon>
                              <span className='material-icons-outlined'>
                                block
                              </span>
                            </Icon>
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                  </Grid>
                );
              }
            })}
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}
