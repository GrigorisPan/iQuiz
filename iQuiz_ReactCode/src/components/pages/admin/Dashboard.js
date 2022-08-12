import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Container, Typography } from '@material-ui/core/';

import { getStatisticsDash } from '../../../actions/statisticsAction';
import UsersDashboard from './components/UsersDashboard';
import QuizzesDashboard from './components/QuizzesDashboard';
import DigitalClassesDashboard from './components/DigitalClassesDashboard';
import ReportsDashboard from './components/ReportsDashboard';
import SuggestQuizzesDashboard from './components/SuggestQuizzesDashboard';
import StatisticsDashboard from './components/StatisticsDashboard';
import { useHistory } from 'react-router-dom';
import Loader from '../../ui/Loader';

export default function Dashboard() {
  const dispatch = useDispatch();
  const history = useHistory;
  const authLogin = useSelector((state) => state.authLogin);
  const { userInfo } = authLogin;

  const statisticsDashboard = useSelector((state) => state.statisticsDashboard);
  const {
    loading,
    users_count,
    quizzes_count,
    suggestquizzes_count,
    statistics_count,
    dClasses_count,
    reports_count,
  } = statisticsDashboard;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login', { from: '/admin' });
    } else {
      dispatch(getStatisticsDash());
    }
  }, [dispatch, history, userInfo]);

  return (
    <Grid
      container
      direction='column'
      justify='center'
      spacing={3}
      style={{ minHeight: '70vh' }}
    >
      <Container maxWidth='lg'>
        <Box sx={{ pb: 5 }}>
          <Typography variant='h4'>Πίνακας Διαχείρισης</Typography>
        </Box>
        {loading ? (
          <Loader />
        ) : (
          <Grid container spacing={3} align='center' style={{ padding: '1em' }}>
            <Grid item xs={12} sm={6} md={4}>
              <UsersDashboard count={users_count} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <QuizzesDashboard count={quizzes_count} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SuggestQuizzesDashboard count={suggestquizzes_count} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatisticsDashboard count={statistics_count} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DigitalClassesDashboard count={dClasses_count} />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <ReportsDashboard count={reports_count} />
            </Grid>
          </Grid>
        )}
      </Container>
    </Grid>
  );
}
