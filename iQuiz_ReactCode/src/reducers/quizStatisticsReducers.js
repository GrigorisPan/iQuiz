import {
  STATISTICS_REQUEST,
  STATISTICS_SUCCESS,
  STATISTICS_FAIL,
  SCORE_REQUEST,
  SCORE_SUCCESS,
  SCORE_FAIL,
  USERS_INCLASS_REQUEST,
  USERS_INCLASS_SUCCESS,
  USERS_INCLASS_FAIL,
  STATISTICS_DELETE_REQUEST,
  STATISTICS_DELETE_SUCCESS,
  STATISTICS_DELETE_FAIL,
  STATISTICS_DELETE_RESET,
  USERS_INCLASS_DELETE_REQUEST,
  USERS_INCLASS_DELETE_SUCCESS,
  USERS_INCLASS_DELETE_FAIL,
  USERS_INCLASS_DELETE_RESET,
  STATISTICS_DASHBOARD_REQUEST,
  STATISTICS_DASHBOARD_SUCCESS,
  STATISTICS_DASHBOARD_FAIL,
  STATISTICS_RESET,
} from '../constants/statisticsConstants';

export const quizStatisticsReducer = (state = { statistics: [] }, action) => {
  switch (action.type) {
    case STATISTICS_REQUEST:
      return { ...state, loading: true };
    case STATISTICS_SUCCESS:
      return { loading: false, statistics: action.payload };
    case STATISTICS_FAIL:
      return { loading: false, error: action.payload, statistics: [] };
    case STATISTICS_RESET:
      return { statistics: [] };
    default:
      return state;
  }
};

export const statisticsDashboardReducer = (state = {}, action) => {
  switch (action.type) {
    case STATISTICS_DASHBOARD_REQUEST:
      return { loading: true, ...state };
    case STATISTICS_DASHBOARD_SUCCESS:
      return { loading: false, ...action.payload };
    case STATISTICS_DASHBOARD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deletedStatisticsReducer = (state = {}, action) => {
  switch (action.type) {
    case STATISTICS_DELETE_REQUEST:
      return { loading: true };
    case STATISTICS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case STATISTICS_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case STATISTICS_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const scoreTableReducer = (state = { score: [] }, action) => {
  switch (action.type) {
    case SCORE_REQUEST:
      return { loading: true, score: [] };
    case SCORE_SUCCESS:
      return { loading: false, score: action.payload };
    case SCORE_FAIL:
      return { loading: false, error: action.payload, score: [] };
    default:
      return state;
  }
};

export const usersInClassReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USERS_INCLASS_REQUEST:
      return { loading: true, users: [] };
    case USERS_INCLASS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case USERS_INCLASS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const usersInClassDeletedReducer = (state = {}, action) => {
  switch (action.type) {
    case USERS_INCLASS_DELETE_REQUEST:
      return { loading: true };
    case USERS_INCLASS_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        users: action.payload,
      };
    case USERS_INCLASS_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case USERS_INCLASS_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
