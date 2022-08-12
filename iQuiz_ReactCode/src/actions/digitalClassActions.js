import {
  DIGITALCLASS_LIST_REQUEST,
  DIGITALCLASS_LIST_SUCCESS,
  DIGITALCLASS_LIST_FAIL,
  DIGITALCLASS_REQUEST,
  DIGITALCLASS_SUCCESS,
  DIGITALCLASS_FAIL,
  DIGITALCLASS_RESET,
  DIGITALCLASS_CREATE_SUCCESS,
  DIGITALCLASS_CREATE_FAIL,
  DIGITALCLASS_CREATE_REQUEST,
  DIGITALCLASS_CREATE_RESET,
  DIGITALCLASS_ENROLL_SUCCESS,
  DIGITALCLASS_ENROLL_REQUEST,
  DIGITALCLASS_ENROLL_FAIL,
  DIGITALCLASS_LIST_ALL_REQUEST,
  DIGITALCLASS_LIST_ALL_SUCCESS,
  DIGITALCLASS_LIST_ALL_FAIL,
  DIGITALCLASS_DELETE_REQUEST,
  DIGITALCLASS_DELETE_SUCCESS,
  DIGITALCLASS_DELETE_FAIL,
  DIGITALCLASS_DELETE_RESET,
  DIGITALCLASS_UPDATE_REQUEST,
  DIGITALCLASS_UPDATE_SUCCESS,
  DIGITALCLASS_UPDATE_FAIL,
  DIGITALCLASS_UPDATE_RESET,
} from '../constants/digitalClassConstants';
import axios from 'axios';

//Get All Digital Classes For Admin
export const getDigitalClassListAll = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DIGITALCLASS_LIST_ALL_REQUEST });
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
      `${process.env.REACT_APP_URL_API}/api/v1/digitalclass`,
      config
    );

    const data = res.data.data;
    dispatch({
      type: DIGITALCLASS_LIST_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DIGITALCLASS_LIST_ALL_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

//Get Digital Classess By Specific User
export const getDigitalClassList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DIGITALCLASS_LIST_REQUEST });
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
      `${process.env.REACT_APP_URL_API}/api/v1/digitalclass/user`,
      config
    );

    const data = res.data.data;
    dispatch({
      type: DIGITALCLASS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DIGITALCLASS_LIST_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const getDigitalClass = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DIGITALCLASS_REQUEST });

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
      `${process.env.REACT_APP_URL_API}/api/v1/digitalclass/${id}`,
      config
    );

    const data = res.data.data[0];
    dispatch({
      type: DIGITALCLASS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DIGITALCLASS_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const digitalClassClean = () => (dispatch) => {
  dispatch({ type: DIGITALCLASS_RESET });
};

//Update Digital Class For Admin
export const digitalClassUpdate = (id, body) => async (dispatch, getState) => {
  try {
    dispatch({ type: DIGITALCLASS_UPDATE_REQUEST });

    const {
      authLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.put(
      `${process.env.REACT_APP_URL_API}/api/v1/digitalclass/${id}`,
      body,
      config
    );

    const data = res.data.data;

    dispatch({
      type: DIGITALCLASS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DIGITALCLASS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const digitalClassUpdateClean = () => (dispatch) => {
  dispatch({ type: DIGITALCLASS_UPDATE_RESET });
};

//Delete Digital Classes For Admin & Teacher
export const deleteDigitalClass = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DIGITALCLASS_DELETE_REQUEST });
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
      `${process.env.REACT_APP_URL_API}/api/v1/digitalclass/${id}`,
      config
    );

    const data = res.data.data;
    dispatch({
      type: DIGITALCLASS_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DIGITALCLASS_DELETE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};
export const deleteDigitalClassClean = () => (dispatch) => {
  dispatch({ type: DIGITALCLASS_DELETE_RESET });
};

export const digitalClassNew = (body) => async (dispatch, getState) => {
  try {
    dispatch({ type: DIGITALCLASS_CREATE_REQUEST });

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
      `${process.env.REACT_APP_URL_API}/api/v1/digitalclass/create/`,
      body,
      config
    );

    const data = res.data.data;
    dispatch({
      type: DIGITALCLASS_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DIGITALCLASS_CREATE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const digitalClassCreateClean = () => (dispatch) => {
  dispatch({ type: DIGITALCLASS_CREATE_RESET });
};

export const digitalClassReqEnroll = (body) => async (dispatch, getState) => {
  try {
    dispatch({ type: DIGITALCLASS_ENROLL_REQUEST });

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
      `${process.env.REACT_APP_URL_API}/api/v1/digitalclass/enroll/`,
      body,
      config
    );

    const data = res.data.data;
    dispatch({
      type: DIGITALCLASS_ENROLL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DIGITALCLASS_ENROLL_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};
