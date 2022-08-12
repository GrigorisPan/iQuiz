import {
  CHART_BARS,
  CONFIG_LIVE_GAME,
  END_LIVE_GAME,
  FETCH_QUESTION_FAIL,
  FETCH_QUESTION_REQUEST,
  FETCH_QUESTION_SUCCESS,
  FILLER_SLIDE,
  LEADERDOARD,
  LSI_URL,
  OPEN_ROOM_FAIL,
  OPEN_ROOM_REQUEST,
  OPEN_ROOM_RESET,
  OPEN_ROOM_SUCCESS,
  PLAYER_DATA,
  PLAY_LIVE_GAME,
  QUESTION_LIVE,
  SET_HOST,
  SET_SETTINGS,
  START_GAME,
  UPDATE_PLAYERS_ANSWERED,
  UPDATE_PLAYER_LOBBY,
  WAITING_LIVE_GAME,
} from '../constants/liveGameConstants';

//<==========================HostGameStart==========================>

export const hostLiveGame = () => (dispatch) => {
  dispatch({ type: CONFIG_LIVE_GAME });
  dispatch({ type: OPEN_ROOM_RESET });
};

export const waitingRoom = () => (dispatch) => {
  dispatch({ type: WAITING_LIVE_GAME });
};

export const endGame = (socket) => (dispatch) => {
  socket.emit('hostEndGame');
};

export const waitingRoomClean = () => (dispatch) => {
  dispatch({ type: OPEN_ROOM_RESET });
};

export const hostPlayGame = (socket) => (dispatch) => {
  dispatch({ type: START_GAME });
  dispatch({ type: PLAY_LIVE_GAME });
};

export const setSettings = (body) => (dispatch) => {
  dispatch({ type: SET_SETTINGS, payload: body });
};

export const lobby = (socket) => async (dispatch, getState) => {
  dispatch({ type: OPEN_ROOM_REQUEST });

  const {
    liveGame: { settings },
  } = getState();

  //When host connects server
  socket.on('connect', function () {
    socket.emit('host-join', settings);
  });

  socket.on('connect_error', (err) => {
    dispatch({
      type: OPEN_ROOM_FAIL,
      payload: 'Σφάλμα αίθουσας',
    });
  });

  socket.on('showGamePin', (data) => {
    if (data) {
      dispatch({
        type: OPEN_ROOM_SUCCESS,
        payload: data.pin,
      });
      dispatch({ type: LSI_URL, payload: data.lsiUrl });
      dispatch({ type: SET_HOST, payload: socket.id });
    } else {
      dispatch({
        type: OPEN_ROOM_FAIL,
        payload: 'Σφάλμα αίθουσας',
      });
    }
  });

  //Adds player's name to screen and updates player count
  socket.on('updatePlayerLobby', (data) => {
    dispatch({ type: UPDATE_PLAYER_LOBBY, payload: data });
  });
};

export const kickPlayer = (socket, playerId) => async (dispatch) => {
  const params = { id: playerId };
  socket.emit('player-kick', params);
};

export const banPlayer = (socket, playerId) => async (dispatch) => {
  const params = { id: playerId };
  socket.emit('player-ban', params);
};

//<==========================HostGamePlay==========================>

export const hostGame = (socket) => async (dispatch, getState) => {
  dispatch({
    type: FETCH_QUESTION_REQUEST,
  });

  const {
    authLogin: { userInfo },
  } = getState();
  const {
    liveGame: { hostId },
  } = getState();

  const params = { id: hostId, token: userInfo.token };

  //When host connects server
  socket.on('connect', function () {
    socket.emit('host-join-game', params);
  });

  socket.on('connect_error', (err) => {
    dispatch({
      type: FETCH_QUESTION_FAIL,
      payload: 'Σφάλμα αίθουσας',
    });
  });

  socket.on('getStarted', (hostId) => {
    dispatch({ type: SET_HOST, payload: hostId });
  });

  socket.on('gameQuestions', (data) => {
    socket.emit('startGame');
    if (data) {
      dispatch({
        type: FETCH_QUESTION_SUCCESS,
        payload: data,
      });
      dispatch({
        type: UPDATE_PLAYERS_ANSWERED,
        payload: null,
      });
      dispatch({
        type: QUESTION_LIVE,
        payload: true,
      });
    } else {
      dispatch({
        type: FETCH_QUESTION_FAIL,
        payload: 'Σφάλμα αίθουσας',
      });
    }
  });

  socket.on('updatePlayersAnswered', (data) => {
    dispatch({
      type: UPDATE_PLAYERS_ANSWERED,
      payload: data,
    });
  });

  socket.on('questionOver', (data) => {
    if (data) {
      dispatch({
        type: CHART_BARS,
        payload: data.chartBars,
      });
      dispatch({
        type: FILLER_SLIDE,
        payload: data.fillerSlideFeedback,
      });
      dispatch({
        type: PLAYER_DATA,
        payload: data.playerData,
      });
    }

    dispatch({
      type: QUESTION_LIVE,
      payload: false,
    });
    dispatch({
      type: UPDATE_PLAYERS_ANSWERED,
      payload: null,
    });
  });

  socket.on('GameOver', (data) => {
    if (data) {
      dispatch({
        type: LEADERDOARD,
        payload: data,
      });
    }
    dispatch({ type: END_LIVE_GAME });
  });

  socket.on('noGameFound', function () {
    //Redirect user to 'join game' page
    dispatch({
      type: FETCH_QUESTION_FAIL,
      payload: 'Σφάλμα κουίζ',
    });
  });
};

export const nextQuestion = (socket) => async (dispatch) => {
  dispatch({
    type: FETCH_QUESTION_REQUEST,
  });
  socket.emit('nextQuestion'); //Tell server to start new question
};

export const timeUp = (socket) => () => {
  socket.emit('timeUp');
};

export const exitGame = () => () => {
  window.location.href = '/';
};
export const startPageGame = () => (dispatch) => {
  dispatch({ type: CONFIG_LIVE_GAME });
  dispatch({ type: OPEN_ROOM_RESET });
};
