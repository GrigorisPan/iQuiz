import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';

import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import theme from './ui/Theme';
import Header from './ui/Header';
import Footer from './ui/Footer';
import Loader from './ui/Loader';
import Layout from './ui/Layout';

import Landing from './liveGame/Landing/Landing';

import LiveGame from './liveGame/LiveGame';
import ClientGame from './liveGame/Game/ClientGame';
import LiveGameClientLayout from './ui/liveGameClientLayout';
import Leaderboard from './liveGame/Host/Leaderboard';

const LandingPage = React.lazy(() => import('./pages/public/LandingPage'));
const ForgotPassword = React.lazy(() =>
  import('./pages/public/ForgotPassword')
);
const ResetPassword = React.lazy(() => import('./pages/public/ResetPassword'));
const Signup = React.lazy(() => import('./pages/public/Signup'));
const Login = React.lazy(() => import('./pages/public/Login'));
const GameLayout = React.lazy(() => import('./ui/GameLayout'));
const Home = React.lazy(() => import('./pages/teacher/Home'));
const InfoQuiz = React.lazy(() => import('./pages/teacher/InfoQuiz'));
const QuizCreate = React.lazy(() => import('./pages/teacher/QuizCreate'));
const Library = React.lazy(() => import('./pages/teacher/Library'));
const DigitalClass = React.lazy(() => import('./pages/teacher/DigitalClass'));
const InfoClass = React.lazy(() => import('./pages/teacher/InfoClass'));
const Statistics = React.lazy(() => import('./pages/teacher/Statistics'));
const Profile = React.lazy(() => import('./pages/teacher/Profile'));
const EditQuiz = React.lazy(() => import('./pages/teacher/EditQuiz'));
const LiveQuizStatistics = React.lazy(() =>
  import('./pages/teacher/LiveQuizStatistics')
);

const HomeSt = React.lazy(() => import('./pages/student/HomeSt'));
const InfoQuizSt = React.lazy(() => import('./pages/student/InfoQuizSt'));
const DigitalClassSt = React.lazy(() =>
  import('./pages/student/DigitalClassSt')
);
const InfoClassSt = React.lazy(() => import('./pages/student/InfoClassSt'));
const ProfileSt = React.lazy(() => import('./pages/student/ProfileSt'));
const StatisticsSt = React.lazy(() => import('./pages/student/StatisticsSt'));

const Dashboard = React.lazy(() => import('./pages/admin/Dashboard'));
const Users = React.lazy(() => import('./pages/admin/Users'));
const UserEdit = React.lazy(() => import('./pages/admin/UserEdit'));
const ProfileAd = React.lazy(() => import('./pages/admin/ProfileAd'));
const DigitalClasses = React.lazy(() => import('./pages/admin/DigitalClasses'));
const DigitalClassEdit = React.lazy(() =>
  import('./pages/admin/DigitalClassEdit')
);
const Quizzes = React.lazy(() => import('./pages/admin/Quizzes'));
const QuizEdit = React.lazy(() => import('./pages/admin/QuizEdit'));
const Reports = React.lazy(() => import('./pages/admin/Reports'));
const SuggestQuizzes = React.lazy(() => import('./pages/admin/SuggestQuizzes'));
const StatisticsAd = React.lazy(() => import('./pages/admin/StatisticsAd'));
const LiveQuizStatisticsAd = React.lazy(() =>
  import('./pages/admin/LiveQuizStatisticsAd')
);
const LiveQuizStatisticsRanking = React.lazy(() =>
  import('./pages/admin/LiveQuizStatisticsRanking')
);

const Game = React.lazy(() => import('./game/Game'));

let login = false;
let type = undefined;

function App() {
  const authLogin = useSelector((state) => state.authLogin);
  const { userInfo } = authLogin;
  if (userInfo) {
    login = true;
    type = +userInfo.type;
  } else {
    login = false;
  }

  const route = () => {
    if (!login) {
      return (
        <React.Fragment>
          <Switch>
            <Route path={['/livegame/landing', '/livegame/game/:playerId']}>
              <Switch>
                <Route exact path='/livegame/landing'>
                  <Landing />
                </Route>
                <Route exact path='/livegame/game/:playerId'>
                  <LiveGameClientLayout>
                    <ClientGame />
                  </LiveGameClientLayout>
                </Route>
              </Switch>
            </Route>
            <Route
              path={['/', '/signup', '/login', '/forgot', '/reset/:resettoken']}
            >
              <Header />
              <Switch>
                <Route exact path='/'>
                  <LandingPage />
                </Route>

                <Route path='/signup'>
                  <Signup />
                </Route>
                <Route exact path='/login'>
                  <Login />
                </Route>
                <Route exact path='/forgot'>
                  <ForgotPassword />
                </Route>
                <Route exact path='/reset/:resettoken'>
                  <ResetPassword />
                </Route>

                <Redirect to='/' />
                <Footer />
              </Switch>
            </Route>
          </Switch>
        </React.Fragment>
      );
    } else if (type === 2) {
      return (
        <React.Fragment>
          <Switch>
            <Route path={['/game/:id']}>
              <GameLayout role={'teacher'}>
                <Switch>
                  <Route exact path='/game/:id' component={Game} />
                </Switch>
              </GameLayout>
            </Route>
            <Route path={['/livegame/host/:id', '/livegame/leaderboard/:id']}>
              <Switch>
                <Route exact path='/livegame/host/:id'>
                  <LiveGame />
                </Route>
              </Switch>
              <Switch>
                <Route
                  exact
                  path='/livegame/leaderboard/:id'
                  component={Leaderboard}
                />
              </Switch>
            </Route>
            <Route path={['/teacher', '/']}>
              <Layout role={'teacher'}>
                <Switch>
                  <Route path='/teacher/search/:searched'>
                    <Home />
                  </Route>
                  <Route exact path='/teacher'>
                    <Home />
                  </Route>
                  <Route exact path='/teacher/quiz/:id'>
                    <InfoQuiz match={URL.match} />
                  </Route>
                  <Route exact path='/teacher/create-quiz'>
                    <QuizCreate />
                  </Route>
                  <Route exact path='/teacher/library/'>
                    <Library />
                  </Route>
                  <Route exact path='/teacher/library/edit/:id'>
                    <EditQuiz match={URL.match} />
                  </Route>
                  <Route exact path='/teacher/digiClass'>
                    <DigitalClass />
                  </Route>
                  <Route exact path='/teacher/digiClass/:id'>
                    <InfoClass />
                  </Route>
                  <Route exact path='/teacher/statistics'>
                    <Statistics />
                  </Route>
                  <Route exact path='/teacher/statistics/livequiz'>
                    <LiveQuizStatistics />
                  </Route>
                  <Route exact path='/profile'>
                    <Profile />
                  </Route>
                  <Redirect to='/teacher' />
                </Switch>
              </Layout>
            </Route>
          </Switch>
        </React.Fragment>
      );
    } else if (type === 0) {
      return (
        <React.Fragment>
          <Switch>
            <Route path={['/game/:id']}>
              <GameLayout role={'student'}>
                <Switch>
                  <Route exact path='/game/:id' component={Game} />
                </Switch>
              </GameLayout>
            </Route>
            <Route path={['/livegame/landing', '/livegame/game/:playerId']}>
              <Switch>
                <Route exact path='/livegame/landing'>
                  <Landing />
                </Route>
                <Route exact path='/livegame/game/:playerId'>
                  <LiveGameClientLayout>
                    <ClientGame />
                  </LiveGameClientLayout>
                </Route>
              </Switch>
            </Route>
            <Route path={['/student', '/']}>
              <Layout role={'student'}>
                <Switch>
                  <Route path='/student/search/:searched'>
                    <HomeSt />
                  </Route>
                  <Route exact path='/student'>
                    <HomeSt />
                  </Route>
                  <Route exact path='/student/quiz/:id'>
                    <InfoQuizSt match={URL.match} />
                  </Route>
                  <Route exact path='/student/statistics'>
                    <StatisticsSt />
                  </Route>
                  <Route exact path='/student/digiClass'>
                    <DigitalClassSt />
                  </Route>
                  <Route exact path='/student/digiClass/:id'>
                    <InfoClassSt />
                  </Route>
                  <Route exact path='/profile'>
                    <ProfileSt />
                  </Route>
                  <Redirect to='/student' />
                </Switch>
              </Layout>
            </Route>
          </Switch>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Layout role={'admin'}>
            <Switch>
              <Route exact path='/admin'>
                <Dashboard />
              </Route>
              <Route exact path='/admin/users'>
                <Users />
              </Route>
              <Route exact path='/admin/users/edit/:id'>
                <UserEdit />
              </Route>
              <Route exact path='/admin/quizzes'>
                <Quizzes />
              </Route>
              <Route exact path='/admin/quizzes/edit/:id'>
                <QuizEdit />
              </Route>
              <Route exact path='/admin/digitalclass'>
                <DigitalClasses />
              </Route>
              <Route exact path='/admin/digitalclass/edit/:id'>
                <DigitalClassEdit />
              </Route>
              <Route exact path='/admin/reports/'>
                <Reports />
              </Route>
              <Route exact path='/admin/suggestquizzes/'>
                <SuggestQuizzes />
              </Route>
              <Route exact path='/admin/statistics/'>
                <StatisticsAd />
              </Route>
              <Route exact path='/admin/statistics/livequiz'>
                <LiveQuizStatisticsAd />
              </Route>
              <Route exact path='/admin/statistics/livequiz/ranking/:id'>
                <LiveQuizStatisticsRanking />
              </Route>
              <Route exact path='/profile'>
                <ProfileAd />
              </Route>
              <Redirect to='/admin' />
            </Switch>
          </Layout>
        </React.Fragment>
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>{route()}</Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
