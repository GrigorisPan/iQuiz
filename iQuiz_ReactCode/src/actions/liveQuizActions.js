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

import axios from 'axios';

export const getLiveQuizzes = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LIVE_QUIZ_LIST_REQUEST });

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
      `${process.env.REACT_APP_URL_API}/api/v1/livegame`,
      config
    );

    const data = res.data.data;

    dispatch({
      type: LIVE_QUIZ_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIVE_QUIZ_LIST_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const getLiveQuizStatistics = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: LIVE_QUIZ_STATISTICS_REQUEST });

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
      `${process.env.REACT_APP_URL_API}/api/v1/livegame/statistics/${id}`,
      config
    );

    const data = res.data.data;

    dispatch({
      type: LIVE_QUIZ_STATISTICS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIVE_QUIZ_STATISTICS_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const liveQuizStatisticsClean = () => async (dispatch) => {
  dispatch({ type: LIVE_QUIZ_STATISTICS_RESET });
  dispatch({ type: LIVE_QUIZ_LIST_RESET });
};

export const liveQuizDelete = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: LIVE_QUIZ_DELETE_REQUEST });
    const {
      authLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    //console.log(config);
    const res = await axios.delete(
      `${process.env.REACT_APP_URL_API}/api/v1/livegame/${id}`,
      config
    );

    const data = res.data.data;

    dispatch({
      type: LIVE_QUIZ_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIVE_QUIZ_DELETE_FAIL,

      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const liveQuizDeleteClean = () => async (dispatch) => {
  dispatch({ type: LIVE_QUIZ_DETELE_RESET });
};
