import {
  SUGGEST_LIST_REQUEST,
  SUGGEST_LIST_SUCCESS,
  SUGGEST_LIST_FAIL,
  SUGGEST_DCLASS_AVAL_REQUEST,
  SUGGEST_DCLASS_AVAL_SUCCESS,
  SUGGEST_DCLASS_AVAL_FAIL,
  SUGGEST_DCLASS_AVAL_RESET,
  SUGGEST_ADD_REQUEST,
  SUGGEST_ADD_SUCCESS,
  SUGGEST_ADD_FAIL,
  SUGGEST_ADD_RESET,
  SUGGEST_DELETE_REQUEST,
  SUGGEST_DELETE_SUCCESS,
  SUGGEST_DELETEL_FAIL,
  SUGGEST_DELETE_RESET,
} from '../constants/suggestConstants';

export const quizSuggestReducer = (state = { suggest: [] }, action) => {
  switch (action.type) {
    case SUGGEST_LIST_REQUEST:
      return { loading: true, suggest: [] };
    case SUGGEST_LIST_SUCCESS:
      return { loading: false, suggest: action.payload };
    case SUGGEST_LIST_FAIL:
      return { loading: false, error: action.payload, suggest: [] };
    default:
      return state;
  }
};

export const dClassAvalSuggestReducer = (
  state = { dClassAval: [] },
  action
) => {
  switch (action.type) {
    case SUGGEST_DCLASS_AVAL_REQUEST:
      return { loading: true, dClassAval: [] };
    case SUGGEST_DCLASS_AVAL_SUCCESS:
      return { loading: false, dClassAval: action.payload };
    case SUGGEST_DCLASS_AVAL_FAIL:
      return { loading: false, error: action.payload };
    case SUGGEST_DCLASS_AVAL_RESET:
      return { dClassAval: [] };
    default:
      return state;
  }
};

export const addSuggestReducer = (state = {}, action) => {
  switch (action.type) {
    case SUGGEST_ADD_REQUEST:
      return { loading: true, ...state };
    case SUGGEST_ADD_SUCCESS:
      return { loading: false, success: true, info: action.payload };
    case SUGGEST_ADD_FAIL:
      return { loading: false, error: action.payload };
    case SUGGEST_ADD_RESET:
      return {};
    default:
      return state;
  }
};

export const deletedSuggestReducer = (state = {}, action) => {
  switch (action.type) {
    case SUGGEST_DELETE_REQUEST:
      return { loading: true };
    case SUGGEST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SUGGEST_DELETEL_FAIL:
      return { loading: false, error: action.payload };
    case SUGGEST_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
