import {
  QUIZ_LIST_REQUEST,
  QUIZ_LIST_SUCCESS,
  QUIZ_LIST_FAIL,
  QUIZ_DETAILS_REQUEST,
  QUIZ_DETAILS_SUCCESS,
  QUIZ_DETAILS_FAIL,
  OTP_CHECK_SUCCESS,
  OTP_CHECK_FAIL,
  OTP_CHECK_REQUEST,
  OTP_CHECK_RESET,
  QUIZ_CREATE_FAIL,
  QUIZ_CREATE_SUCCESS,
  QUIZ_CREATE_REQUEST,
  QUIZ_CREATE_RESET,
  QUIZ_DETAILS_RESET,
  QUIZ_UPDATE_FAIL,
  QUIZ_UPDATE_SUCCESS,
  QUIZ_UPDATE_REQUEST,
  QUIZ_UPDATE_RESET,
  QUIZ_DELETE_SUCCESS,
  QUIZ_DELETE_REQUEST,
  QUIZ_DELETE_FAIL,
  QUIZ_LIBRARY_LIST_REQUEST,
  QUIZ_LIBRARY_LIST_SUCCESS,
  QUIZ_LIBRARY_LIST_FAIL,
  QUIZ_LIBRARY_DETAILS_REQUEST,
  QUIZ_LIBRARY_DETAILS_SUCCESS,
  QUIZ_LIBRARY_DETAILS_FAIL,
  QUIZ_LIBRARY_DETAILS_RESET,
  QUIZ_DELETE_RESET,
} from '../constants/quizConstants';
import axios from 'axios';

export const listQuizzes =
  (searched = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: QUIZ_LIST_REQUEST });

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
        `${process.env.REACT_APP_URL_API}/api/v1/quizzes/?searched=${searched}`,
        config
      );

      const data = res.data.data;

      dispatch({
        type: QUIZ_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: QUIZ_LIST_FAIL,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.error,
      });
    }
  };

export const listLibraryQuizzes = () => async (dispatch, getState) => {
  try {
    dispatch({ type: QUIZ_LIBRARY_LIST_REQUEST });

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
      `${process.env.REACT_APP_URL_API}/api/v1/quizzes/all`,
      config
    );

    const data = res.data.data;

    dispatch({
      type: QUIZ_LIBRARY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: QUIZ_LIBRARY_LIST_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const listQuizDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: QUIZ_DETAILS_REQUEST });

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
      `${process.env.REACT_APP_URL_API}/api/v1/quizzes/${id}`,
      config
    );

    const data = res.data.data;
    dispatch({
      type: QUIZ_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: QUIZ_DETAILS_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const listQuizDetailsClean = () => (dispatch) => {
  dispatch({ type: QUIZ_DETAILS_RESET });
};

export const listLibraryQuizDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: QUIZ_LIBRARY_DETAILS_REQUEST });

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
      `${process.env.REACT_APP_URL_API}/api/v1/quizzes/all/${id}`,
      config
    );

    const data = res.data.data;
    dispatch({
      type: QUIZ_LIBRARY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: QUIZ_LIBRARY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const listLibraryQuizDetailsClean = () => (dispatch) => {
  dispatch({ type: QUIZ_LIBRARY_DETAILS_RESET });
};

export const otpQuizCheck = (otp) => async (dispatch, getState) => {
  const {
    authLogin: { userInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  try {
    dispatch({ type: OTP_CHECK_REQUEST });

    const res = await axios.get(
      `${process.env.REACT_APP_URL_API}/api/v1/game/check/${otp}`,
      config
    );

    console.log(res.data.data.questions.question.length);
    if (res) {
      const data = {
        otpCode: otp,
        questions_count: res.data.data.questions.question.length,
        data: res.data.data.questions.question,
      };
      dispatch({
        type: OTP_CHECK_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: OTP_CHECK_FAIL,
      payload: 'Σφάλμα',
    });
  }
};

export const otpClean = () => (dispatch) => {
  dispatch({ type: OTP_CHECK_RESET });
};

export const quizNew = (body) => async (dispatch, getState) => {
  try {
    dispatch({ type: QUIZ_CREATE_REQUEST });

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
      `${process.env.REACT_APP_URL_API}/api/v1/quizzes/`,
      body,
      config
    );

    const data = res.data.data;

    dispatch({
      type: QUIZ_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: QUIZ_CREATE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const quizCreateClean = () => (dispatch) => {
  dispatch({ type: QUIZ_CREATE_RESET });
};

export const quizUpdateInfo = (id, body) => async (dispatch, getState) => {
  try {
    dispatch({ type: QUIZ_UPDATE_REQUEST });

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
      `${process.env.REACT_APP_URL_API}/api/v1/quizzes/${id}`,
      body,
      config
    );

    const data = res.data.data;

    dispatch({
      type: QUIZ_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: QUIZ_UPDATE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const quizUpdateClean = () => (dispatch) => {
  dispatch({ type: QUIZ_UPDATE_RESET });
};

export const quizDelete = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: QUIZ_DELETE_REQUEST });

    const {
      authLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(
      `${process.env.REACT_APP_URL_API}/api/v1/quizzes/${id}`,
      config
    );
    dispatch({
      type: QUIZ_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: QUIZ_DELETE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const quizDeleteClean = () => (dispatch) => {
  dispatch({ type: QUIZ_DELETE_RESET });
};
