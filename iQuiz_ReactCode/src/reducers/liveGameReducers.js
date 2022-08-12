import {
  CONFIG_LIVE_GAME,
  END_LIVE_GAME,
  PLAY_LIVE_GAME,
  WAITING_LIVE_GAME,
  SET_SETTINGS,
  OPEN_ROOM_REQUEST,
  OPEN_ROOM_SUCCESS,
  OPEN_ROOM_RESET,
  OPEN_ROOM_FAIL,
  UPDATE_PLAYER_LOBBY,
  SET_HOST,
  SET_PLAYER,
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_REQUEST,
  FETCH_QUESTION_FAIL,
  START_GAME,
  ENTRANCE_CLIENT_LIVE_GAME,
  WAITING_CLIENT_LIVE_GAME,
  PLAY_CLIENT_LIVE_GAME,
  END_CLIENT_LIVE_GAME,
  ENTRY_GAME_SUCCESS,
  ENTRY_GAME_REQUEST,
  PLAYER_JOIN_REQUEST,
  PLAYER_JOIN_SUCCESS,
  PLAYER_JOIN_FAIL,
  PLAYER_JOIN_RESET,
  GET_STARTED,
  PLAYER_JOIN_GAME_REQUEST,
  PLAYER_JOIN_GAME_SUCCESS,
  PLAYER_JOIN_GAME_FAIL,
  PLAYER_ANSWER_QUESTION,
  CORRECT_ANSWER,
  FEEDBACK_ANSWER,
  UPDATE_PLAYERS_ANSWERED,
  QUESTION_LIVE,
  TIME_UP,
  PLAYER_DATA,
  PLAYER_DISABLE,
  LEADERDOARD,
  FILLER_SLIDE,
  CHART_BARS,
  LSI_URL,
} from '../constants/liveGameConstants';
//<=======================Host==========================>

export const liveGameStateReducer = (state = {}, action) => {
  switch (action.type) {
    case CONFIG_LIVE_GAME:
      return { state: CONFIG_LIVE_GAME };
    case WAITING_LIVE_GAME:
      return { state: WAITING_LIVE_GAME };
    case PLAY_LIVE_GAME:
      return { state: PLAY_LIVE_GAME };
    case END_LIVE_GAME:
      return { state: END_LIVE_GAME };
    default:
      return state;
  }
};

export const liveGameReducer = (
  state = {
    hostId: null,
    room: null,
    lsiUrl: null,
    startGame: false,
    settings: null,
    players: [],
    question: null,
    questionLive: false,
    playersAnswered: null,
    playerData: [],
    leaderboard: [],
    fillerSlide: null,
    chartBars: null,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case SET_SETTINGS:
      return { ...state, settings: action.payload };
    case SET_HOST:
      return { ...state, hostId: action.payload };
    case LSI_URL:
      return { ...state, lsiUrl: action.payload };
    case OPEN_ROOM_REQUEST:
      return { loading: true, ...state };
    case OPEN_ROOM_SUCCESS:
      return { ...state, loading: false, room: action.payload };
    case OPEN_ROOM_FAIL:
      return { loading: false, error: action.payload };
    case OPEN_ROOM_RESET:
      return {
        hostId: null,
        room: null,
        lsiUrl: null,
        startGame: false,
        settings: null,
        players: [],
        question: null,
        questionLive: false,
        playersAnswered: null,
        playerData: [],
        leaderboard: [],
        fillerSlide: null,
        chartBars: null,
        error: null,
      };
    case UPDATE_PLAYER_LOBBY:
      return {
        ...state,
        players: action.payload,
      };
    case START_GAME:
      return {
        ...state,
        loading: true,
        startGame: true,
      };
    case FETCH_QUESTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        question: action.payload,
      };
    case FETCH_QUESTION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_PLAYERS_ANSWERED:
      return { ...state, playersAnswered: action.payload };
    case QUESTION_LIVE:
      return { ...state, questionLive: action.payload };
    case PLAYER_DATA:
      return { ...state, playerData: action.payload };
    case LEADERDOARD:
      return { ...state, loading: false, leaderboard: action.payload };
    case FILLER_SLIDE:
      return { ...state, fillerSlide: action.payload };
    case CHART_BARS:
      return { ...state, chartBars: action.payload };
    default:
      return state;
  }
};

//<=======================Client==========================>

export const liveGameClientStateReducer = (state = {}, action) => {
  switch (action.type) {
    case ENTRANCE_CLIENT_LIVE_GAME:
      return { state: ENTRANCE_CLIENT_LIVE_GAME };
    case WAITING_CLIENT_LIVE_GAME:
      return { state: WAITING_CLIENT_LIVE_GAME };
    case PLAY_CLIENT_LIVE_GAME:
      return { state: PLAY_CLIENT_LIVE_GAME };
    case END_CLIENT_LIVE_GAME:
      return { state: END_CLIENT_LIVE_GAME };
    default:
      return state;
  }
};

export const liveGameClientReducer = (
  state = {
    playerInfo: null,
    playerId: null,
    connection: false,
    gameStarted: false,
    playerData: null,
    playerAnswered: false,
    correct: false,
    feedback: false,
    timeUp: false,
    playerDisable: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case SET_PLAYER:
      return { ...state, playerInfo: action.payload };
    case ENTRY_GAME_REQUEST:
      return { ...state, loading: true };
    case ENTRY_GAME_SUCCESS:
      return { ...state, loading: false, playerInfo: action.payload };
    case PLAYER_JOIN_REQUEST:
      return { ...state, loading: true };
    case PLAYER_JOIN_SUCCESS:
      return {
        ...state,
        loading: false,
        connection: true,
        playerId: action.payload,
      };
    case PLAYER_JOIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case PLAYER_JOIN_RESET:
      return {
        playerInfo: null,
        playerId: null,
        connection: false,
        gameStarted: false,
        playerData: null,
        playerAnswered: false,
        correct: false,
        feedback: false,
        playerDisable: false,
        error: null,
      };
    case GET_STARTED:
      return { ...state, gameStarted: true };
    case PLAYER_JOIN_GAME_REQUEST:
      return { ...state, loading: true };
    case PLAYER_JOIN_GAME_SUCCESS:
      return {
        ...state,
        loading: false,
        playerData: action.payload,
      };
    case PLAYER_JOIN_GAME_FAIL:
      return { ...state, loading: false, error: action.payload };
    case PLAYER_ANSWER_QUESTION:
      return { ...state, playerAnswered: action.payload };
    case CORRECT_ANSWER:
      return { ...state, correct: action.payload };
    case FEEDBACK_ANSWER:
      return { ...state, feedback: action.payload };
    case TIME_UP:
      return { ...state, timeUp: action.payload };
    case PLAYER_DISABLE:
      return { ...state, playerDisable: true };
    default:
      return state;
  }
};
