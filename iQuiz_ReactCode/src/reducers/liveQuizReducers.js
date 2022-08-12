import {
  LIVE_QUIZ_DELETE_FAIL,
  LIVE_QUIZ_DELETE_REQUEST,
  LIVE_QUIZ_DELETE_SUCCESS,
  LIVE_QUIZ_DETELE_RESET,
  LIVE_QUIZ_LIST_FAIL,
  LIVE_QUIZ_LIST_REQUEST,
  LIVE_QUIZ_LIST_RESET,
  LIVE_QUIZ_LIST_SUCCESS,
  LIVE_QUIZ_STATISTICS_FAIL,
  LIVE_QUIZ_STATISTICS_REQUEST,
  LIVE_QUIZ_STATISTICS_RESET,
  LIVE_QUIZ_STATISTICS_SUCCESS,
} from '../constants/liveQuizConstants';

export const liveQuizListReducer = (state = { liveQuizzes: [] }, action) => {
  switch (action.type) {
    case LIVE_QUIZ_LIST_REQUEST:
      return { loading: true, liveQuizzes: [] };
    case LIVE_QUIZ_LIST_SUCCESS:
      return { loading: false, success: true, liveQuizzes: action.payload };
    case LIVE_QUIZ_LIST_FAIL:
      return { loading: false, error: action.payload };
    case LIVE_QUIZ_LIST_RESET:
      return { liveQuizzes: [] };
    default:
      return state;
  }
};

export const liveQuizStatisticsReducer = (
  state = { liveQuizStat: [] },
  action
) => {
  switch (action.type) {
    case LIVE_QUIZ_STATISTICS_REQUEST:
      return { loading: true, liveQuizStat: [] };
    case LIVE_QUIZ_STATISTICS_SUCCESS:
      return { loading: false, success: true, liveQuizStat: action.payload };
    case LIVE_QUIZ_STATISTICS_FAIL:
      return { loading: false, error: action.payload };
    case LIVE_QUIZ_STATISTICS_RESET:
      return { liveQuizStat: [] };
    default:
      return state;
  }
};

export const liveQuizDeletedReducer = (state = {}, action) => {
  switch (action.type) {
    case LIVE_QUIZ_DELETE_REQUEST:
      return { loading: true };
    case LIVE_QUIZ_DELETE_SUCCESS:
      return { loading: false, success: true };
    case LIVE_QUIZ_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case LIVE_QUIZ_DETELE_RESET:
      return {};
    default:
      return state;
  }
};
