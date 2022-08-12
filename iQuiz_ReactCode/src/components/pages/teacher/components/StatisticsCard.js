import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Icon } from '@material-ui/core';
import Button from '@material-ui/core/Button';
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
  deleteButton: {
    ...theme.typography.mainButton,
    padding: '0em',
    marginBottom: '0.35rem',
    color: '#ff4569',
    '&:hover': {
      backgroundColor: '#ff4569',
      color: '#fff',
    },
  },
}));

export default function StatisticsCard(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [reportsShow, setReportsShow] = useState(false);
  const reports = props.statistic.reports;
  const hasReports = reports.length === 0 ? false : true;

  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const reportsHandler = () => {
    setReportsShow((prevState) => !prevState);
  };

  const displayDate = (timestamp) => {
    const todate = new Date(timestamp).getDate();
    const tomonth = new Date(timestamp).getMonth() + 1;
    const toyear = new Date(timestamp).getFullYear();
    const original_date = todate + '/' + tomonth + '/' + toyear;
    return original_date;
  };

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
                    Χρήστες:{' '}
                    <span className={classes.specialText2}>
                      {props.statistic.count_play_users}
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
                <Grid item container alignItems='center'>
                  <Typography
                    gutterBottom
                    variant='subtitle2'
                    style={{ paddingRight: '1em' }}
                  >
                    Αναφορές:{' '}
                    <span className={classes.specialText2}>
                      {hasReports ? props.statistic.reports.length : 0}
                    </span>
                  </Typography>
                  {hasReports && (
                    <Button
                      onClick={reportsHandler}
                      style={{ marginLeft: '1em' }}
                    >
                      <Icon>
                        <span className='material-icons-outlined'>
                          expand_more
                        </span>
                      </Icon>
                    </Button>
                  )}
                </Grid>
              </CardContent>
            </Grid>
          </Grid>
        </Grid>
        {reportsShow && (
          <CardContent>
            <Typography
              gutterBottom
              variant={matchesXS ? 'h5' : 'h4'}
              align='center'
            >
              Αναφορές{' '}
            </Typography>
            <Divider
              style={{
                marginBottom: '1em',
                marginTop: '1em',
              }}
            />
            {reports &&
              reports.map((report) => (
                <Grid
                  item
                  container
                  key={report.id}
                  direction='column'
                  /*    justify='left' */
                >
                  <Grid item>
                    <Typography
                      gutterBottom
                      variant='body2'
                      style={{ paddingRight: '1em' }}
                    >
                      Ερώτηση:{' '}
                      <span className={classes.specialText}>
                        {report.question}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    container
                    justify='center'
                    style={{ paddingBottom: '1em' }}
                  >
                    <Typography
                      gutterBottom
                      variant='body2'
                      style={{ paddingRight: '1em' }}
                    >
                      Xρήστης:{' '}
                      <span className={classes.specialText}>
                        {report.users_p.username}
                      </span>
                    </Typography>
                    <Typography
                      gutterBottom
                      variant='body2'
                      style={{ paddingRight: '1em' }}
                    >
                      Email:{' '}
                      <span className={classes.specialText}>
                        {report.users_p.email}
                      </span>
                    </Typography>
                    <Typography
                      gutterBottom
                      variant='body2'
                      style={{ paddingRight: '1em' }}
                    >
                      Ημερομηνία:{' '}
                      <span className={classes.specialText}>
                        {displayDate(report.createdAt)}
                      </span>
                    </Typography>
                    <Button
                      variant='outlined'
                      className={classes.deleteButton}
                      onClick={() => {
                        props.deleteHandler(report.id);
                      }}
                    >
                      <Icon>
                        <span className='material-icons-outlined'>clear</span>
                      </Icon>
                    </Button>
                  </Grid>
                </Grid>
              ))}
          </CardContent>
        )}
      </Card>
    </Grid>
  );
}
