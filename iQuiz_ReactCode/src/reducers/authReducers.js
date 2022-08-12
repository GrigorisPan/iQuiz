import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_RESET,
  USER_INFO_CHECK_REQUEST,
  USER_INFO_CHECK_SUCCESS,
  USER_INFO_CHECK_FAIL,
  USER_INFO_CHECK_RESET,
  REFRESH_INFO_REQUEST,
  REFRESH_INFO_SUCCESS,
  REFRESH_INFO_FAIL,
  REFRESH_INFO_RESET,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_RESET,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_RESET,
} from '../constants/authConstants';

export const authLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { loading: true };
    case LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export const authRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { loading: true };
    case REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const authForgotReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return { loading: true };
    case FORGOT_PASSWORD_SUCCESS:
      return { loading: false, success: true, msg: action.payload };
    case FORGOT_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case FORGOT_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

export const authResetReducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return { loading: true };
    case RESET_PASSWORD_SUCCESS:
      return { loading: false, success: true, msg: action.payload };
    case RESET_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case RESET_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

export const authCheckReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_INFO_CHECK_REQUEST:
      return { loading: true };
    case USER_INFO_CHECK_SUCCESS:
      return { loading: false, success: true, userInfoCheck: action.payload };
    case USER_INFO_CHECK_FAIL:
      return { loading: false, error: action.payload };
    case USER_INFO_CHECK_RESET:
      return {};
    default:
      return state;
  }
};

export const authRefreshReducer = (state = {}, action) => {
  switch (action.type) {
    case REFRESH_INFO_REQUEST:
      return { loading: true };
    case REFRESH_INFO_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case REFRESH_INFO_FAIL:
      return { loading: false, error: action.payload };
    case REFRESH_INFO_RESET:
      return {};
    default:
      return state;
  }
};
