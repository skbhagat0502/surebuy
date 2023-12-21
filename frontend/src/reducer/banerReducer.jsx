import {
  NEW_BANER_REQUEST,
  NEW_BANER_SUCCESS,
  NEW_BANER_FAIL,
  NEW_BANER_RESET,
  DELETE_BANER_REQUEST,
  DELETE_BANER_SUCCESS,
  DELETE_BANER_FAIL,
  DELETE_BANER_RESET,
  ALL_BANER_REQUEST,
  ALL_BANER_SUCCESS,
  ALL_BANER_FAIL,
  CLEAR_ERRORS,
} from "../constants/banerConstant";

export const allBanerReducer = (state = { baners: [] }, action) => {
  switch (action.type) {
    case ALL_BANER_REQUEST:
      return {
        loading: true,
        baners: [],
      };
    case ALL_BANER_SUCCESS:
      return {
        loading: false,
        baners: action.payload.baners,
      };
    case ALL_BANER_FAIL:
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

export const newBanerReducer = (state = { baner: {} }, action) => {
  switch (action.type) {
    case NEW_BANER_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case NEW_BANER_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        baner: action.payload.baner,
      };
    case NEW_BANER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_BANER_RESET:
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

export const banerReducer = (state = { baner: {} }, action) => {
  switch (action.type) {
    case DELETE_BANER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_BANER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_BANER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case DELETE_BANER_RESET:
      return { ...state, isDeleted: false };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
