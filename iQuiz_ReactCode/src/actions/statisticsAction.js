import {
  STATISTICS_REQUEST,
  STATISTICS_SUCCESS,
  STATISTICS_FAIL,
  SCORE_REQUEST,
  SCORE_SUCCESS,
  SCORE_FAIL,
  USERS_INCLASS_SUCCESS,
  USERS_INCLASS_REQUEST,
  USERS_INCLASS_FAIL,
  STATISTICS_DELETE_REQUEST,
  STATISTICS_DELETE_SUCCESS,
  STATISTICS_DELETE_FAIL,
  STATISTICS_DELETE_RESET,
  USERS_INCLASS_DELETE_SUCCESS,
  USERS_INCLASS_DELETE_FAIL,
  USERS_INCLASS_DELETE_RESET,
  USERS_INCLASS_DELETE_REQUEST,
  STATISTICS_DASHBOARD_SUCCESS,
  STATISTICS_DASHBOARD_FAIL,
  STATISTICS_DASHBOARD_REQUEST,
} from '../constants/statisticsConstants';
import axios from 'axios';

export const getStatisticsAll = () => async (dispatch, getState) => {
  try {
    dispatch({ type: STATISTICS_REQUEST });
    const {
      authLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_URL_API}/api/v1/statistics/all`,
      config
    );

    const data = res.data.data;

    dispatch({
      type: STATISTICS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STATISTICS_FAIL,

      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const getStatisticsDash = () => async (dispatch, getState) => {
  try {
    dispatch({ type: STATISTICS_DASHBOARD_REQUEST });
    const {
      authLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_URL_API}/api/v1/statistics/dashboard`,
      config
    );

    const data = res.data.data;

    dispatch({
      type: STATISTICS_DASHBOARD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STATISTICS_DASHBOARD_FAIL,

      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const getStatistics = () => async (dispatch, getState) => {
  try {
    dispatch({ type: STATISTICS_REQUEST });
    const {
      authLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_URL_API}/api/v1/statistics/`,
      config
    );

    const data = res.data.data;

    dispatch({
      type: STATISTICS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STATISTICS_FAIL,

      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const deleteStatistics = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: STATISTICS_DELETE_REQUEST });

    const {
      authLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.delete(
      `${process.env.REACT_APP_URL_API}/api/v1/statistics/${id}`,
      config
    );
    const data = res.data.data;

    dispatch({
      type: STATISTICS_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STATISTICS_DELETE_FAIL,

      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const deleteStatisticsClean = () => async (dispatch) => {
  dispatch({ type: STATISTICS_DELETE_RESET });
};

export const getScore = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SCORE_REQUEST });

    const {
      authLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.get(
      `${process.env.REACT_APP_URL_API}/api/v1/statistics/score/${id}`,
      config
    );

    const data = res.data.data;

    dispatch({
      type: SCORE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SCORE_FAIL,

      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const getAllUsersInClass = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USERS_INCLASS_REQUEST });
    const {
      authLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_URL_API}/api/v1/statistics/users/all`,
      config
    );

    const data = res.data.data;

    dispatch({
      type: USERS_INCLASS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USERS_INCLASS_FAIL,

      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const getUsersInClass = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USERS_INCLASS_REQUEST });
    const {
      authLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_URL_API}/api/v1/statistics/users/${id}`,
      config
    );

    const data = res.data;

    dispatch({
      type: USERS_INCLASS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USERS_INCLASS_FAIL,

      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const deleteUserInClass = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USERS_INCLASS_DELETE_REQUEST });

    const {
      authLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.delete(
      `${process.env.REACT_APP_URL_API}/api/v1/statistics/users/${id}`,
      config
    );
    const data = res.data.data;

    dispatch({
      type: USERS_INCLASS_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USERS_INCLASS_DELETE_FAIL,

      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const deleteUserInClassClean = () => async (dispatch) => {
  dispatch({ type: USERS_INCLASS_DELETE_RESET });
};
