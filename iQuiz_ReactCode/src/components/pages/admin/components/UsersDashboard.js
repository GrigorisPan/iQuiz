import * as React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@material-ui/core/';
import { Icon } from '@material-ui/core';
import Route from '../../../ui/Route';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#C2E1E8',
  },
  cardMedia: {
    paddingTop: '2em',
    opacity: '0.8',
  },
  cardContent: {
    flexGrow: 1,
    color: '#3a4345',
  },
  specialText: {
    color: '#3a4345',
  },
}));

export default function UsersDashboard({ count }) {
  const classes = useStyles();
  let history = useHistory();
  //console.log(count);
  return (
    <Grid item align='center'>
      <Card
        onClick={() => {
          history.push('/admin/users');
          <Route value={1} />;
        }}
        className={classes.card}
        sx={{ maxWidth: 345 }}
      >
        <CardActionArea>
          <CardMedia className={classes.cardMedia}>
            {' '}
            <Icon style={{ fontSize: '48px' }}>
              <span className='material-icons md-48'> </span>
              <span className={classes.specialText}>people</span>
            </Icon>
          </CardMedia>
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant='h4' component='div'>
              <span className={classes.specialText}>{count ? count : '-'}</span>
            </Typography>
            <Typography variant='body2' style={{ opacity: '0.9' }}>
              Χρήστες
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
