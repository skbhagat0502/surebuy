import {
  ALL_MODELS_FAIL,
  ALL_MODELS_REQUEST,
  ALL_MODELS_SUCCESS,
  ADMIN_MODELS_REQUEST,
  ADMIN_MODELS_SUCCESS,
  ADMIN_MODELS_FAIL,
  CREATE_MODEL_REQUEST,
  CREATE_MODEL_SUCCESS,
  CREATE_MODEL_FAIL,
  CREATE_MODEL_RESET,
  UPDATE_MODEL_REQUEST,
  UPDATE_MODEL_SUCCESS,
  UPDATE_MODEL_FAIL,
  UPDATE_MODEL_RESET,
  DELETE_MODEL_REQUEST,
  DELETE_MODEL_SUCCESS,
  DELETE_MODEL_FAIL,
  DELETE_MODEL_RESET,
  MODEL_DETAILS_REQUEST,
  MODEL_DETAILS_FAIL,
  MODEL_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/modelConstant";

export const modelsReducer = (state = { models: [] }, action) => {
  switch (action.type) {
    case ALL_MODELS_REQUEST:
    case ADMIN_MODELS_REQUEST:
      return {
        loading: true,
        models: [],
      };
    case ALL_MODELS_SUCCESS:
      return {
        loading: false,
        models: action.payload.models,
      };

    case ADMIN_MODELS_SUCCESS:
      return {
        loading: false,
        models: action.payload,
      };
    case ALL_MODELS_FAIL:
    case ADMIN_MODELS_FAIL:
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

export const newModelReducer = (state = { model: {} }, action) => {
  switch (action.type) {
    case CREATE_MODEL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_MODEL_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        model: action.payload.model,
      };
    case CREATE_MODEL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_MODEL_RESET:
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

export const modelReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_MODEL_REQUEST:
    case UPDATE_MODEL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_MODEL_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_MODEL_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_MODEL_FAIL:
    case UPDATE_MODEL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_MODEL_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_MODEL_RESET:
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

export const modelDetailsReducer = (state = { model: {} }, action) => {
  switch (action.type) {
    case MODEL_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case MODEL_DETAILS_SUCCESS:
      return {
        loading: false,
        model: action.payload,
      };
    case MODEL_DETAILS_FAIL:
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
