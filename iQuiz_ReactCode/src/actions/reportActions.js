import {
  REPORT_LIST_FAIL,
  REPORT_LIST_REQUEST,
  REPORT_LIST_SUCCESS,
  REPORT_DELETE_FAIL,
  REPORT_DELETE_REQUEST,
  REPORT_DELETE_SUCCESS,
  REPORT_DETELE_RESET,
  REPORT_CREATE_REQUEST,
  REPORT_CREATE_SUCCESS,
  REPORT_CREATE_FAIL,
  REPORT_CREATE_RESET,
  REPORT_CHECK_SUCCESS,
} from '../constants/reportConstants';
import axios from 'axios';

export const getReportsAll = () => async (dispatch, getState) => {
  try {
    dispatch({ type: REPORT_LIST_REQUEST });
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
      `${process.env.REACT_APP_URL_API}/api/v1/reports/all`,
      config
    );

    const data = res.data.data;

    dispatch({
      type: REPORT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REPORT_LIST_FAIL,

      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const reportDelete = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: REPORT_DELETE_REQUEST });
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
      `${process.env.REACT_APP_URL_API}/api/v1/reports/${id}`,
      config
    );

    const data = res.data.data;

    dispatch({
      type: REPORT_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REPORT_DELETE_FAIL,

      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const reportDeleteClean = () => async (dispatch) => {
  dispatch({ type: REPORT_DETELE_RESET });
};

export const reportCreate = (body) => async (dispatch, getState) => {
  try {
    dispatch({ type: REPORT_CREATE_REQUEST });
    const {
      authLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.post(
      `${process.env.REACT_APP_URL_API}/api/v1/reports/`,
      body,
      config
    );

    const data = res.data.data;

    dispatch({
      type: REPORT_CREATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: REPORT_CHECK_SUCCESS,
      payload: false,
    });
  } catch (error) {
    dispatch({
      type: REPORT_CREATE_FAIL,

      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const reportCreateClean = () => async (dispatch) => {
  dispatch({ type: REPORT_CREATE_RESET });
};
