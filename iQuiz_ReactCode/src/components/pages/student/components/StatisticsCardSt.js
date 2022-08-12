import React from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '100%',
    marginBottom: '2em',
  },
  specialText: {
    color: theme.palette.common.orange,
  },
  specialText2: {
    color: theme.palette.common.blue,
    fontWeight: 450,
  },
  button: {
    ...theme.typography.secondaryButton,
    color: theme.palette.common.blue,
  },
}));

export default function StatisticsCardSt(props) {
  const classes = useStyles();
  const theme = useTheme();

  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Grid item container sm={12} md={9} lg={8}>
      <Card className={classes.root}>
        <Grid item container direction='row'>
          <Grid item xs={12} sm={6} md={7}>
            <Grid item container direction='column'>
              <CardContent>
                <Grid item align={matchesXS ? 'center' : ''}>
                  <Typography variant='h6' paragraph>
                    {props.statistic.title}
                  </Typography>
                </Grid>
              </CardContent>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
            <Grid item container direction='column' alignItems='center'>
              <CardContent>
                <Grid item>
                  <Typography gutterBottom variant='subtitle2'>
                    Φορές:{' '}
                    <span className={classes.specialText2}>
                      {props.statistic.play_count}
                    </span>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant='subtitle2'>
                    ΜΟ Βαθμολογίας:{' '}
                    <span className={classes.specialText2}>
                      {props.statistic.score_avg}
                    </span>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant='subtitle2'>
                    ΜΟ Σωστών Απ.:{' '}
                    <span className={classes.specialText2}>
                      {props.statistic.correct_avg}
                    </span>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant='subtitle2'>
                    ΜΟ Λανθασμένων Απ.:{' '}
                    <span className={classes.specialText2}>
                      {props.statistic.false_avg}
                    </span>
                  </Typography>
                </Grid>
              </CardContent>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
