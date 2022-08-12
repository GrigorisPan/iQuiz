import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

let interval;

export default function Timer({ timeLeft, setTimeLeft, page = '' }) {
  useEffect(() => {
    if (page === 'fillerSlideTimer') {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 2);
      }, 1000);
    } else {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [setTimeLeft, page]);
  return (
    <>
      {page === 'fillerSlideTimer' ? (
        <div>
          <LinearProgress variant='determinate' value={timeLeft} />
        </div>
      ) : (
        <Typography variant='subtitle1' style={{ color: '#ee6600' }}>
          Time: {timeLeft}
        </Typography>
      )}
    </>
  );
}
