import {
  QUIZ_LIST_REQUEST,
  QUIZ_LIST_SUCCESS,
  QUIZ_LIST_FAIL,
  QUIZ_DETAILS_REQUEST,
  QUIZ_DETAILS_SUCCESS,
  QUIZ_DETAILS_FAIL,
  OTP_CHECK_REQUEST,
  OTP_CHECK_SUCCESS,
  OTP_CHECK_FAIL,
  OTP_CHECK_RESET,
  QUIZ_CREATE_REQUEST,
  QUIZ_CREATE_SUCCESS,
  QUIZ_CREATE_FAIL,
  QUIZ_CREATE_RESET,
  QUIZ_DETAILS_RESET,
  QUIZ_UPDATE_REQUEST,
  QUIZ_UPDATE_SUCCESS,
  QUIZ_UPDATE_RESET,
  QUIZ_UPDATE_FAIL,
  QUIZ_DELETE_REQUEST,
  QUIZ_DELETE_SUCCESS,
  QUIZ_DELETE_FAIL,
  QUIZ_LIBRARY_LIST_REQUEST,
  QUIZ_LIBRARY_LIST_SUCCESS,
  QUIZ_LIBRARY_LIST_FAIL,
  QUIZ_LIBRARY_DETAILS_REQUEST,
  QUIZ_LIBRARY_DETAILS_SUCCESS,
  QUIZ_LIBRARY_DETAILS_FAIL,
  QUIZ_LIBRARY_DETAILS_RESET,
  QUIZ_DELETE_RESET,
  QUIZ_LIBRARY_LIST_RESET,
  QUIZ_LIST_RESET,
} from '../constants/quizConstants';

export const quizListReducer = (state = { quizzes: [] }, action) => {
  switch (action.type) {
    case QUIZ_LIST_REQUEST:
      return { loading: true, quizzes: [] };
    case QUIZ_LIST_SUCCESS:
      return { loading: false, quizzes: action.payload };
    case QUIZ_LIST_FAIL:
      return { loading: false, error: action.payload };
    case QUIZ_LIST_RESET:
      return { quizzes: [] };
    default:
      return state;
  }
};

export const quizLibraryListReducer = (state = { quizzes: [] }, action) => {
  switch (action.type) {
    case QUIZ_LIBRARY_LIST_REQUEST:
      return { loading: true, quizzes: [] };
    case QUIZ_LIBRARY_LIST_SUCCESS:
      return { loading: false, quizzes: action.payload };
    case QUIZ_LIBRARY_LIST_FAIL:
      return { loading: false, error: action.payload, quizzes: [] };
    case QUIZ_LIBRARY_LIST_RESET:
      return { quizzes: [] };
    default:
      return state;
  }
};

export const quizDetailsReducer = (
  state = { quiz: { users_p: {} } },
  action
) => {
  switch (action.type) {
    case QUIZ_DETAILS_REQUEST:
      return { loading: true, ...state };
    case QUIZ_DETAILS_SUCCESS:
      return { loading: false, quiz: action.payload };
    case QUIZ_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case QUIZ_DETAILS_RESET:
      return { quiz: { users_p: {} } };
    default:
      return state;
  }
};

export const quizLibraryDetailsReducer = (
  state = { quiz: { users_p: {} } },
  action
) => {
  switch (action.type) {
    case QUIZ_LIBRARY_DETAILS_REQUEST:
      return { loading: true, ...state };
    case QUIZ_LIBRARY_DETAILS_SUCCESS:
      return { loading: false, quiz: action.payload };
    case QUIZ_LIBRARY_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case QUIZ_LIBRARY_DETAILS_RESET:
      return { quiz: { users_p: {} } };
    default:
      return state;
  }
};

export const otpCheckReducer = (state = { questions: null }, action) => {
  switch (action.type) {
    case OTP_CHECK_REQUEST:
      return { loading: true, questions: null };
    case OTP_CHECK_SUCCESS:
      return { loading: false, questions: action.payload };
    case OTP_CHECK_FAIL:
      return { loading: false, error: action.payload };
    case OTP_CHECK_RESET:
      return { questions: null };
    default:
      return state;
  }
};

export const quizCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case QUIZ_CREATE_REQUEST:
      return { loading: true };
    case QUIZ_CREATE_SUCCESS:
      return { loading: false, newQuiz: action.payload };
    case QUIZ_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case QUIZ_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const quizUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case QUIZ_UPDATE_REQUEST:
      return { loading: true };
    case QUIZ_UPDATE_SUCCESS:
      return { loading: false, success: true, updatedQuiz: action.payload };
    case QUIZ_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case QUIZ_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const quizDeletedReducer = (state = {}, action) => {
  switch (action.type) {
    case QUIZ_DELETE_REQUEST:
      return { loading: true };
    case QUIZ_DELETE_SUCCESS:
      return { loading: false, success: true };
    case QUIZ_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case QUIZ_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
