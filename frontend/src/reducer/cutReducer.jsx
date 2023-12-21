import {
  ALL_CUT_CONSTANT_REQUEST,
  ALL_CUT_CONSTANT_SUCCESS,
  ALL_CUT_CONSTANT_FAIL,
  ADMIN_CUT_CONSTANT_REQUEST,
  ADMIN_CUT_CONSTANT_SUCCESS,
  ADMIN_CUT_CONSTANT_FAIL,
  CREATE_CUT_CONSTANT_REQUEST,
  CREATE_CUT_CONSTANT_SUCCESS,
  CREATE_CUT_CONSTANT_FAIL,
  CREATE_CUT_CONSTANT_RESET,
  UPDATE_CUT_CONSTANT_REQUEST,
  UPDATE_CUT_CONSTANT_SUCCESS,
  UPDATE_CUT_CONSTANT_FAIL,
  UPDATE_CUT_CONSTANT_RESET,
  CUT_DETAILS_CONSTANT_REQUEST,
  CUT_DETAILS_CONSTANT_SUCCESS,
  CUT_DETAILS_CONSTANT_FAIL,
  CLEAR_ERRORS,
} from "../constants/cutConstant";

export const cutsReducer = (state = { cuts: [] }, action) => {
  switch (action.type) {
    case ALL_CUT_CONSTANT_REQUEST:
    case ADMIN_CUT_CONSTANT_REQUEST:
      return {
        loading: true,
        cuts: [],
      };
    case ALL_CUT_CONSTANT_SUCCESS:
    case ADMIN_CUT_CONSTANT_SUCCESS:
      return {
        loading: false,
        cuts: action.payload.cuts,
      };
    case ALL_CUT_CONSTANT_FAIL:
    case ADMIN_CUT_CONSTANT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newCutReducer = (state = { cut: {} }, action) => {
  switch (action.type) {
    case CREATE_CUT_CONSTANT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_CUT_CONSTANT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        cut: action.payload.cut,
      };
    case CREATE_CUT_CONSTANT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_CUT_CONSTANT_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const cutReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CUT_CONSTANT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_CUT_CONSTANT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case UPDATE_CUT_CONSTANT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_CUT_CONSTANT_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const cutDetailsReducer = (state = { cut: {} }, action) => {
  switch (action.type) {
    case CUT_DETAILS_CONSTANT_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case CUT_DETAILS_CONSTANT_SUCCESS:
      return {
        loading: false,
        cut: action.payload,
      };
    case CUT_DETAILS_CONSTANT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
