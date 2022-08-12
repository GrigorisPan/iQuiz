import {
  SUGGEST_LIST_REQUEST,
  SUGGEST_LIST_SUCCESS,
  SUGGEST_LIST_FAIL,
  SUGGEST_DCLASS_AVAL_REQUEST,
  SUGGEST_DCLASS_AVAL_SUCCESS,
  SUGGEST_DCLASS_AVAL_FAIL,
  SUGGEST_DCLASS_AVAL_RESET,
  SUGGEST_ADD_FAIL,
  SUGGEST_ADD_SUCCESS,
  SUGGEST_ADD_REQUEST,
  SUGGEST_ADD_RESET,
  SUGGEST_DELETE_REQUEST,
  SUGGEST_DELETE_SUCCESS,
  SUGGEST_DELETEL_FAIL,
  SUGGEST_DELETE_RESET,
} from '../constants/suggestConstants';
import axios from 'axios';

export const listSuggestQuizAll = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SUGGEST_LIST_REQUEST });
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
      `${process.env.REACT_APP_URL_API}/api/v1/suggestquiz/all`,
      config
    );

    const data = res.data.data;

    dispatch({
      type: SUGGEST_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUGGEST_LIST_FAIL,

      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const listSuggestQuiz = (id) => async (dispatch) => {
  try {
    dispatch({ type: SUGGEST_LIST_REQUEST });

    const res = await axios.get(
      `${process.env.REACT_APP_URL_API}/api/v1/suggestquiz/${id}`
    );

    const data = res.data.data;

    dispatch({
      type: SUGGEST_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUGGEST_LIST_FAIL,

      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const listDclassSuggest = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SUGGEST_DCLASS_AVAL_REQUEST });

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
      `${process.env.REACT_APP_URL_API}/api/v1/suggestquiz/available/${id}`,
      config
    );
    const data = res.data.data;

    dispatch({
      type: SUGGEST_DCLASS_AVAL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUGGEST_DCLASS_AVAL_FAIL,

      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const listDclassSuggestClean = () => async (dispatch) => {
  dispatch({ type: SUGGEST_DCLASS_AVAL_RESET });
};

export const addSuggestQuiz = (body) => async (dispatch, getState) => {
  try {
    dispatch({ type: SUGGEST_ADD_REQUEST });

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
      `${process.env.REACT_APP_URL_API}/api/v1/suggestquiz/add/`,
      body,
      config
    );
    const data = res.data.data;

    dispatch({
      type: SUGGEST_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUGGEST_ADD_FAIL,

      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const addSuggestQuizClean = () => async (dispatch) => {
  dispatch({ type: SUGGEST_ADD_RESET });
};

export const deleteSuggestQuiz = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SUGGEST_DELETE_REQUEST });

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
      `${process.env.REACT_APP_URL_API}/api/v1/suggestquiz/${id}`,
      config
    );
    const data = res.data.data;

    dispatch({
      type: SUGGEST_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUGGEST_DELETEL_FAIL,

      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const deleteQuizClean = () => async (dispatch) => {
  dispatch({ type: SUGGEST_DELETE_RESET });
};
