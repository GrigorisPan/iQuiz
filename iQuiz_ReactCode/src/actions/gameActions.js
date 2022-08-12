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
import axios from 'axios';
import {
  REPORT_CHECK_FAIL,
  REPORT_CHECK_REQUEST,
  REPORT_CHECK_SUCCESS,
} from '../constants/reportConstants';

//Check if user can play the quiz
export const checkCanPlay = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GAME_CHECK_REQUEST });
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
      `${process.env.REACT_APP_URL_API}/api/v1/game/${id}`,
      config
    );

    const data = res.data.data;
    dispatch({
      type: GAME_CHECK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GAME_CHECK_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};
export const checkCanPlayClean = () => (dispatch) => {
  dispatch({ type: GAME_CHECK_RESET });
};

//Check if user can report the quiz
export const checkCanReport = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: REPORT_CHECK_REQUEST });
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
      `${process.env.REACT_APP_URL_API}/api/v1/reports/check/${id}`,
      config
    );

    const data = res.data.data;
    dispatch({
      type: REPORT_CHECK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REPORT_CHECK_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const startGame = () => (dispatch) => {
  dispatch({ type: START_GAME });
};

export const fetchingQuestions = (id) => async (dispatch, getState) => {
  dispatch({ type: FETCHING_GAME });
  try {
    dispatch({ type: FETCH_QUESTIONS_REQUEST });
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
      `${process.env.REACT_APP_URL_API}/api/v1/game/play/${id}`,
      config
    );

    const data = res.data.data.questions.question;
    dispatch({
      type: FETCH_QUESTIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_QUESTIONS_FAIL,
      payload: 'Σφάλμα εύρεσης ερωτήσεων',
    });
  }
};

export const fetchingQuestionsClean = () => (dispatch) => {
  dispatch({ type: FETCH_QUESTIONS_RESET });
};

export const playGame = () => (dispatch) => {
  dispatch({ type: PLAY_GAME });
};

export const finnishGame = () => (dispatch) => {
  dispatch({ type: END_GAME });
};

export const answerQuestion = (option) => (dispatch, getState) => {
  const {
    game: { currentQuestionIndex, questions, score, false_ans, true_ans },
  } = getState();

  const letter_answer = questions[currentQuestionIndex].correct;
  const correct_answer =
    questions[currentQuestionIndex][`ans${letter_answer}`][0];

  if (correct_answer === option) {
    dispatch({ type: SET_SCORE, payload: score + 10 });
    dispatch({ type: SET_TRUE_ANS, payload: true_ans + 1 });
  } else {
    if (score >= 2) {
      dispatch({ type: SET_SCORE, payload: score - 2 });
    }
    dispatch({ type: SET_FALSE_ANS, payload: false_ans + 1 });
  }
  dispatch({ type: SET_INDEX, payload: currentQuestionIndex + 1 });
};

export const nextQuestion = () => (dispatch, getState) => {
  const {
    game: { currentQuestionIndex },
  } = getState();

  dispatch({ type: SET_INDEX, payload: currentQuestionIndex + 1 });
};

export const saveGame = (body) => async (dispatch, getState) => {
  try {
    dispatch({ type: SAVE_GAME_SCORE_REQUEST });
    const {
      authLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(
      `${process.env.REACT_APP_URL_API}/api/v1/game/save`,
      body,
      config
    );

    dispatch({
      type: SAVE_GAME_SCORE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: SAVE_GAME_SCORE_FAIL,
    });
  }
};

export const updateGame = (body) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_GAME_SCORE_REQUEST });
    const {
      authLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(
      `${process.env.REACT_APP_URL_API}/api/v1/game/save`,
      body,
      config
    );

    dispatch({
      type: UPDATE_GAME_SCORE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_GAME_SCORE_FAIL,
    });
  }
};
