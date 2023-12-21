import {
  ALL_VARIANTS_REQUEST,
  ALL_VARIANTS_SUCCESS,
  ALL_VARIANTS_FAIL,
  ADMIN_VARIANTS_REQUEST,
  ADMIN_VARIANTS_SUCCESS,
  ADMIN_VARIANTS_FAIL,
  CREATE_VARIANT_REQUEST,
  CREATE_VARIANT_SUCCESS,
  CREATE_VARIANT_FAIL,
  CREATE_VARIANT_RESET,
  UPDATE_VARIANT_REQUEST,
  UPDATE_VARIANT_SUCCESS,
  UPDATE_VARIANT_FAIL,
  UPDATE_VARIANT_RESET,
  DELETE_VARIANT_REQUEST,
  DELETE_VARIANT_SUCCESS,
  DELETE_VARIANT_FAIL,
  DELETE_VARIANT_RESET,
  CLEAR_ERRORS,
} from "../constants/variantConstant";

export const variantsReducer = (state = { variants: [] }, action) => {
  switch (action.type) {
    case ALL_VARIANTS_REQUEST:
    case ADMIN_VARIANTS_REQUEST:
      return {
        loading: true,
        variants: [],
      };
    case ALL_VARIANTS_SUCCESS:
      return {
        loading: false,
        variants: action.payload.variants,
      };
    case ADMIN_VARIANTS_SUCCESS:
      return {
        loading: false,
        variants: action.payload,
      };
    case ALL_VARIANTS_FAIL:
    case ADMIN_VARIANTS_FAIL:
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

export const newVariantReducer = (state = { variant: {} }, action) => {
  switch (action.type) {
    case CREATE_VARIANT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_VARIANT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        variant: action.payload.variant,
      };
    case CREATE_VARIANT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_VARIANT_RESET:
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

export const variantReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_VARIANT_REQUEST:
    case UPDATE_VARIANT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_VARIANT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_VARIANT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_VARIANT_FAIL:
    case UPDATE_VARIANT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_VARIANT_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_VARIANT_RESET:
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
