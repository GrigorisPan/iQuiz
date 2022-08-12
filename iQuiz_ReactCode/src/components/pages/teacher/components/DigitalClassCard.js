import React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Hidden from '@material-ui/core/Hidden';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles((theme) => ({
  specialText: {
    color: theme.palette.common.orange,
  },
  root: {
    maxWidth: '70%',
    minWidth: '70%',
    marginBottom: '2em',
    padding: theme.spacing(2),
    overflow: 'auto',
    [theme.breakpoints.down('md')]: {
      minWidth: '100%',
    },
  },
}));

export default function DigitalClassCard({ dclass }) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={`/teacher/digiClass/${dclass.id}`}>
        <Grid item container direction='row'>
          <Grid item sm={matchesXS ? 7 : 10}>
            <Grid item container direction='column'>
              <CardContent>
                <Grid item>
                  <Typography gutterBottom variant='h6'>
                    {dclass.title}
                  </Typography>
                  {/* <Typography gutterBottom variant='subtitle2'>
                    Εκπαιδευτικός <br />
                    <span className={classes.specialText}>
                      Grigoris Panagiotopoulos
                    </span>
                  </Typography> */}
                  <Hidden smDown>
                    <Typography gutterBottom variant='subtitle2'>
                      Περιγραφή: <br /> {dclass.description}
                    </Typography>
                  </Hidden>
                </Grid>
              </CardContent>
            </Grid>
          </Grid>
          <Grid item sm={matchesXS ? 5 : 2}>
            <Grid item container direction='column' alignItems='flex-end'>
              <CardContent>
                <Grid item>
                  <Typography gutterBottom variant='subtitle2'>
                    Κωδικός:{' '}
                    <span className={classes.specialText}>{dclass.id}</span>
                  </Typography>
                </Grid>
              </CardContent>
            </Grid>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
}
