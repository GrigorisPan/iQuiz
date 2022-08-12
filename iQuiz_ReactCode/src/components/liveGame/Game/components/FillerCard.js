import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Hidden from '@material-ui/core/Hidden';

import Timer from '../../../game/components/Timer';

const useStyles = makeStyles((theme) => ({
  specialText: {
    color: theme.palette.common.orange,
  },
  root: {
    maxWidth: '100%',
    minWidth: '60%',
    margin: '2em',
    /*  overflow: 'auto', */
    backgroundColor: '#461a42',
    [theme.breakpoints.down('md')]: {
      minWidth: '100%',
    },
  },
}));
const options = ['A', 'B', 'C', 'D', 'E'];
const colorArray = ['#2f6dae', '#2c9ca6', '#eca82c', '#ba2f47', '#66994D'];

function FillerCard({ nextQuestionHandler, setShowCorrect }) {
  const classes = useStyles();

  const [timeLeft, setTimeLeft] = useState(100);

  const liveGame = useSelector((state) => state.liveGame);
  const { chartBars, fillerSlide } = liveGame;

  useEffect(() => {
    if (timeLeft < 0) {
      setShowCorrect();
      nextQuestionHandler();
    }
  });

  return (
    <Card elevation={9} className={classes.root}>
      <Grid item container direction='row' xs={12}>
        <Grid item container justify='center'>
          <CardContent>
            <Grid item>
              <Typography
                gutterBottom
                variant='h4'
                style={{ color: '#ffff', margin: '0.5em' }}
              >
                {fillerSlide ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `${fillerSlide}`,
                      /*    __html: `Ερώτηση<br><img src="https://picsum.photos/200"/>`, */
                    }}
                  ></div>
                ) : (
                  'Δεν απάντησε κάνεις'
                )}
              </Typography>
            </Grid>
            {/* </Grid> */}
          </CardContent>
        </Grid>
        {chartBars && (
          <Grid item container direction='column'>
            <CardContent>
              <Grid item>
                <Hidden xsDown>
                  <Grid
                    container
                    justify='center'
                    style={{
                      height: '300px',
                    }}
                  >
                    {options.map((option, i) => (
                      <Grid
                        item
                        key={i}
                        container
                        style={{
                          width: '12%',
                          backgroundColor: `${colorArray[i]}`,
                          margin: '0em 0.2em',
                          border: 'none',
                          borderRadius: '2px',
                        }}
                      >
                        <Grid
                          item
                          style={{
                            width: '100%',
                            height: `${chartBars[i]}px`,
                            backgroundColor: '#461a42',
                            textAlign: 'center',
                          }}
                        >
                          <Typography
                            gutterBottom
                            variant='h4'
                            style={{ color: '#fff' }}
                          >
                            {option}
                          </Typography>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </Hidden>
              </Grid>
            </CardContent>
          </Grid>
        )}
        <Grid item container justify='center'>
          <Grid item container direction='column' sm={12} md={8}>
            <CardContent>
              <Timer
                timeLeft={timeLeft}
                setTimeLeft={setTimeLeft}
                page='fillerSlideTimer'
              />
            </CardContent>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export default React.memo(FillerCard);
