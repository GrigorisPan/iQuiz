import {
  DIGITALCLASS_LIST_REQUEST,
  DIGITALCLASS_LIST_SUCCESS,
  DIGITALCLASS_LIST_FAIL,
  DIGITALCLASS_REQUEST,
  DIGITALCLASS_SUCCESS,
  DIGITALCLASS_FAIL,
  DIGITALCLASS_RESET,
  DIGITALCLASS_CREATE_RESET,
  DIGITALCLASS_CREATE_FAIL,
  DIGITALCLASS_CREATE_SUCCESS,
  DIGITALCLASS_CREATE_REQUEST,
  DIGITALCLASS_ENROLL_REQUEST,
  DIGITALCLASS_ENROLL_SUCCESS,
  DIGITALCLASS_ENROLL_FAIL,
  DIGITALCLASS_ENROLL_RESET,
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

export const digitalClassListAllReducer = (
  state = { dClasses: [] },
  action
) => {
  switch (action.type) {
    case DIGITALCLASS_LIST_ALL_REQUEST:
      return { loading: true, dClasses: [] };
    case DIGITALCLASS_LIST_ALL_SUCCESS:
      return { loading: false, dClasses: action.payload };
    case DIGITALCLASS_LIST_ALL_FAIL:
      return { loading: false, error: action.payload, dClasses: [] };
    default:
      return state;
  }
};

export const digitalClassDeletedReducer = (state = {}, action) => {
  switch (action.type) {
    case DIGITALCLASS_DELETE_REQUEST:
      return { ...state, loading: true };
    case DIGITALCLASS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case DIGITALCLASS_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case DIGITALCLASS_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const digitalClassListReducer = (state = { dClasses: [] }, action) => {
  switch (action.type) {
    case DIGITALCLASS_LIST_REQUEST:
      return { loading: true, dClasses: [] };
    case DIGITALCLASS_LIST_SUCCESS:
      return { loading: false, dClasses: action.payload };
    case DIGITALCLASS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const digitalClassReducer = (state = { dClass: [] }, action) => {
  switch (action.type) {
    case DIGITALCLASS_REQUEST:
      return { loading: true, ...state };
    case DIGITALCLASS_SUCCESS:
      return { loading: false, dClass: action.payload };
    case DIGITALCLASS_FAIL:
      return { loading: false, error: action.payload };
    case DIGITALCLASS_RESET:
      return { dClass: [] };
    default:
      return state;
  }
};

export const digitalClassUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case DIGITALCLASS_UPDATE_REQUEST:
      return { loading: true };
    case DIGITALCLASS_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        updatedDigitalClass: action.payload,
      };
    case DIGITALCLASS_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case DIGITALCLASS_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const digitalClassCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DIGITALCLASS_CREATE_REQUEST:
      return { loading: true };
    case DIGITALCLASS_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        newDigitalClass: action.payload,
      };
    case DIGITALCLASS_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case DIGITALCLASS_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const digitalClassEnrollReducer = (state = {}, action) => {
  switch (action.type) {
    case DIGITALCLASS_ENROLL_REQUEST:
      return { loading: true };
    case DIGITALCLASS_ENROLL_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DIGITALCLASS_ENROLL_FAIL:
      return { loading: false, error: action.payload };
    case DIGITALCLASS_ENROLL_RESET:
      return {};
    default:
      return state;
  }
};
