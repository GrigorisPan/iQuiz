import {
  REPORT_CREATE_FAIL,
  REPORT_CREATE_REQUEST,
  REPORT_CREATE_RESET,
  REPORT_CREATE_SUCCESS,
  REPORT_DELETE_FAIL,
  REPORT_DELETE_REQUEST,
  REPORT_DELETE_SUCCESS,
  REPORT_DETELE_RESET,
  REPORT_LIST_FAIL,
  REPORT_LIST_REQUEST,
  REPORT_LIST_SUCCESS,
} from '../constants/reportConstants';

export const reportListReducer = (state = { reports: [] }, action) => {
  switch (action.type) {
    case REPORT_LIST_REQUEST:
      return { ...state, loading: true };
    case REPORT_LIST_SUCCESS:
      return { loading: false, reports: action.payload };
    case REPORT_LIST_FAIL:
      return { loading: false, error: action.payload, reports: [] };
    default:
      return state;
  }
};

export const reportDeletedReducer = (state = {}, action) => {
  switch (action.type) {
    case REPORT_DELETE_REQUEST:
      return { loading: true };
    case REPORT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case REPORT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case REPORT_DETELE_RESET:
      return {};
    default:
      return state;
  }
};

export const gameReportReducer = (state = {}, action) => {
  switch (action.type) {
    case REPORT_CREATE_REQUEST:
      return { loading: true };
    case REPORT_CREATE_SUCCESS:
      return { loading: false, success: true, msg: action.payload };
    case REPORT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case REPORT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
