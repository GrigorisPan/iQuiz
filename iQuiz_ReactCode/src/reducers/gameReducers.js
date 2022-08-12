import {
  END_GAME,
  FETCHING_GAME,
  FETCH_QUESTIONS_FAIL,
  FETCH_QUESTIONS_REQUEST,
  FETCH_QUESTIONS_RESET,
  FETCH_QUESTIONS_SUCCESS,
  GAME_CHECK_FAIL,
  GAME_CHECK_REQUEST,
  GAME_CHECK_RESET,
  GAME_CHECK_SUCCESS,
  PLAY_GAME,
  SAVE_GAME_SCORE_FAIL,
  SAVE_GAME_SCORE_REQUEST,
  SAVE_GAME_SCORE_SUCCESS,
  SET_FALSE_ANS,
  SET_INDEX,
  SET_SCORE,
  SET_TRUE_ANS,
  START_GAME,
  UPDATE_GAME_SCORE_FAIL,
  UPDATE_GAME_SCORE_REQUEST,
  UPDATE_GAME_SCORE_SUCCESS,
} from '../constants/gameConstants';
import {
  REPORT_CHECK_FAIL,
  REPORT_CHECK_REQUEST,
  REPORT_CHECK_SUCCESS,
} from '../constants/reportConstants';

export const checkPlayReducer = (state = {}, action) => {
  switch (action.type) {
    case GAME_CHECK_REQUEST:
      return { ...state, loading: true };
    case GAME_CHECK_SUCCESS:
      return { ...state, loading: false, canPlay: action.payload };
    case GAME_CHECK_FAIL:
      return { ...state, loading: false, errorPlay: action.payload };
    case GAME_CHECK_RESET:
      return {};
    case REPORT_CHECK_REQUEST:
      return { ...state, loading: true };
    case REPORT_CHECK_SUCCESS:
      return { ...state, loading: false, canReport: action.payload };
    case REPORT_CHECK_FAIL:
      return { ...state, loading: false, errorReport: action.payload };
    default:
      return state;
  }
};

export const gameStateReducer = (state = {}, action) => {
  switch (action.type) {
    case START_GAME:
      return { state: START_GAME };
    case FETCHING_GAME:
      return { state: FETCHING_GAME };
    case PLAY_GAME:
      return { state: PLAY_GAME };
    case END_GAME:
      return { state: END_GAME };
    default:
      return state;
  }
};

export const gameReducer = (
  state = {
    questions: [],
    error: null,
    score: null,
    currentQuestionIndex: null,
    false_ans: null,
    true_ans: null,
  },
  action
) => {
  switch (action.type) {
    case FETCH_QUESTIONS_REQUEST:
      return { loading: true, ...state };
    case FETCH_QUESTIONS_SUCCESS:
      return {
        ...state,
        false_ans: 0,
        true_ans: 0,
        loading: false,
        questions: action.payload,
        score: 0,
        currentQuestionIndex: 0,
      };
    case FETCH_QUESTIONS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case FETCH_QUESTIONS_RESET:
      return {
        questions: [],
        error: null,
        score: null,
        currentQuestionIndex: null,
        false_ans: null,
        true_ans: null,
      };
    case SET_SCORE:
      return {
        ...state,
        score: action.payload,
      };
    case SET_INDEX:
      return {
        ...state,
        currentQuestionIndex: action.payload,
      };
    case SET_FALSE_ANS:
      return {
        ...state,
        false_ans: action.payload,
      };
    case SET_TRUE_ANS:
      return {
        ...state,
        true_ans: action.payload,
      };
    default:
      return state;
  }
};

export const gameSaveScoreReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_GAME_SCORE_REQUEST:
      return { loading: true };
    case SAVE_GAME_SCORE_SUCCESS:
      return { loading: false, success: true };
    case SAVE_GAME_SCORE_FAIL:
      return { loading: false, success: false };
    default:
      return state;
  }
};

export const gameUpdateScoreReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_GAME_SCORE_REQUEST:
      return { loading: true };
    case UPDATE_GAME_SCORE_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_GAME_SCORE_FAIL:
      return { loading: false, success: false };
    default:
      return state;
  }
};
