import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import {
  quizDetailsReducer,
  quizListReducer,
  otpCheckReducer,
  quizCreateReducer,
  quizUpdateReducer,
  quizDeletedReducer,
  quizLibraryListReducer,
  quizLibraryDetailsReducer,
} from './reducers/quizReducers';
import {
  scoreTableReducer,
  quizStatisticsReducer,
  usersInClassReducer,
  deletedStatisticsReducer,
  usersInClassDeletedReducer,
  statisticsDashboardReducer,
} from './reducers/quizStatisticsReducers';
import {
  digitalClassListReducer,
  digitalClassReducer,
  digitalClassCreateReducer,
  digitalClassEnrollReducer,
  digitalClassListAllReducer,
  digitalClassDeletedReducer,
  digitalClassUpdateReducer,
} from './reducers/digitalClassReducers';
import {
  authLoginReducer,
  authRegisterReducer,
  authCheckReducer,
  authRefreshReducer,
  authForgotReducer,
  authResetReducer,
} from './reducers/authReducers';
import {
  userDeletedReducer,
  userDetailsReducer,
  userListReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers';
import {
  addSuggestReducer,
  dClassAvalSuggestReducer,
  deletedSuggestReducer,
  quizSuggestReducer,
} from './reducers/quizSuggestReducers';
import {
  gameReportReducer,
  reportDeletedReducer,
  reportListReducer,
} from './reducers/reportReducers';
import {
  checkPlayReducer,
  gameStateReducer,
  gameReducer,
  gameSaveScoreReducer,
  gameUpdateScoreReducer,
} from './reducers/gameReducers';
import {
  liveGameClientReducer,
  liveGameClientStateReducer,
  liveGameReducer,
  liveGameStateReducer,
} from './reducers/liveGameReducers';
import {
  liveQuizDeletedReducer,
  liveQuizListReducer,
  liveQuizStatisticsReducer,
} from './reducers/liveQuizReducers';

const reducer = combineReducers({
  authLogin: authLoginReducer,
  authRegister: authRegisterReducer,
  authForgot: authForgotReducer,
  authReset: authResetReducer,
  authCheck: authCheckReducer,
  authRefresh: authRefreshReducer,
  statisticsDashboard: statisticsDashboardReducer,
  userList: userListReducer,
  userDetails: userDetailsReducer,
  userDeleted: userDeletedReducer,
  userUpdateProfile: userUpdateProfileReducer,
  quizList: quizListReducer,
  quizLibraryList: quizLibraryListReducer,
  quizDetails: quizDetailsReducer,
  quizLibraryDetails: quizLibraryDetailsReducer,
  quizStatistics: quizStatisticsReducer,
  quizCreate: quizCreateReducer,
  quizUpdate: quizUpdateReducer,
  quizDeleted: quizDeletedReducer,
  quizSuggest: quizSuggestReducer,
  liveQuizList: liveQuizListReducer,
  liveQuizStatistics: liveQuizStatisticsReducer,
  liveQuizDeleted: liveQuizDeletedReducer,
  digitalClassListAll: digitalClassListAllReducer,
  digitalClassList: digitalClassListReducer,
  digitalClass: digitalClassReducer,
  digitalClassDeleted: digitalClassDeletedReducer,
  digitalClassUpdated: digitalClassUpdateReducer,
  digitalClassCreate: digitalClassCreateReducer,
  digitalClassEnroll: digitalClassEnrollReducer,
  dClassAvalSuggest: dClassAvalSuggestReducer,
  addSuggest: addSuggestReducer,
  deletedSuggest: deletedSuggestReducer,
  deletedStatistics: deletedStatisticsReducer,
  scoreTable: scoreTableReducer,
  usersInClass: usersInClassReducer,
  usersInClassDeleted: usersInClassDeletedReducer,
  reportList: reportListReducer,
  reportDeleted: reportDeletedReducer,
  otpCheck: otpCheckReducer,
  checkPlay: checkPlayReducer,
  gameState: gameStateReducer,
  game: gameReducer,
  gameSaveScore: gameSaveScoreReducer,
  gameUpdateScore: gameUpdateScoreReducer,
  gameReport: gameReportReducer,
  liveGameState: liveGameStateReducer,
  liveGame: liveGameReducer,
  liveGameClientState: liveGameClientStateReducer,
  liveGameClient: liveGameClientReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  authLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

let store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

/* export const rootReducer = (action) => {
  if (action === 'LOGOUT') {
    store = createStore(
      reducer,
      initialState,
      composeWithDevTools(applyMiddleware(...middleware))
    );
  }
  return store;
}; */

export default store;
