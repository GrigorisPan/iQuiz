import axios from 'axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_RESET,
  USER_INFO_CHECK_FAIL,
  USER_INFO_CHECK_SUCCESS,
  USER_INFO_CHECK_REQUEST,
  REFRESH_INFO_REQUEST,
  REFRESH_INFO_SUCCESS,
  REFRESH_INFO_FAIL,
  FORGOT_PASSWORD_RESET,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_RESET,
} from '../constants/authConstants';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_URL_API}/api/v1/auth/login`,
      { email, password },
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const loginClean = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const logout = () => async (dispatch, getState) => {
  try {
    const {
      authLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.get(
      `${process.env.REACT_APP_URL_API}/api/v1/auth/logout`,
      config
    );
  } catch (error) {
    document.cookie =
      'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
  window.location.href = '/';
  localStorage.removeItem('userInfo');
};

export const register =
  (username, email, type, password) => async (dispatch) => {
    try {
      dispatch({
        type: REGISTER_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_URL_API}/api/v1/auth/register`,
        { username, email, type, password },
        config
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.error,
      });
    }
  };

export const registerClean = () => (dispatch) => {
  dispatch({ type: REGISTER_RESET });
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_URL_API}/api/v1/auth/forgotpassword`,
      { email },
      config
    );

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const forgotPasswordClean = () => (dispatch) => {
  dispatch({ type: FORGOT_PASSWORD_RESET });
};

export const resetPassword = (password, resettoken) => async (dispatch) => {
  try {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_URL_API}/api/v1/auth/resetpassword/${resettoken}`,
      { password },
      config
    );

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const resetPasswordClean = () => (dispatch) => {
  dispatch({ type: RESET_PASSWORD_RESET });
};

export const userCheck = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_INFO_CHECK_REQUEST,
    });

    const {
      authLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_URL_API}/api/v1/auth/check`,
      config
    );

    dispatch({
      type: USER_INFO_CHECK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_INFO_CHECK_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const userInfoRefresh = () => async (dispatch) => {
  try {
    dispatch({
      type: REFRESH_INFO_REQUEST,
    });

    const { data } = await axios.get(
      `${process.env.REACT_APP_URL_API}/api/v1/auth/refreshToken`
    );

    dispatch({
      type: REFRESH_INFO_SUCCESS,
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REFRESH_INFO_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};
