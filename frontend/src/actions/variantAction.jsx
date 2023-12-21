import axios from "axios";

import {
  ALL_VARIANTS_FAIL,
  ALL_VARIANTS_REQUEST,
  ALL_VARIANTS_SUCCESS,
  ADMIN_VARIANTS_REQUEST,
  ADMIN_VARIANTS_SUCCESS,
  ADMIN_VARIANTS_FAIL,
  CREATE_VARIANT_REQUEST,
  CREATE_VARIANT_SUCCESS,
  CREATE_VARIANT_FAIL,
  UPDATE_VARIANT_REQUEST,
  UPDATE_VARIANT_SUCCESS,
  UPDATE_VARIANT_FAIL,
  DELETE_VARIANT_REQUEST,
  DELETE_VARIANT_SUCCESS,
  DELETE_VARIANT_FAIL,
  CLEAR_ERRORS,
} from "../constants/variantConstant";

// Get All MODELS
export const getVariant = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_VARIANTS_REQUEST });

    let link = `/api/v1/variants`;

    const { data } = await axios.get(link);

    dispatch({
      type: ALL_VARIANTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_VARIANTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All VARIANT For Admin
export const getAdminVariant = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_VARIANTS_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/variants`);

    dispatch({
      type: ADMIN_VARIANTS_SUCCESS,
      payload: data.variants,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_VARIANTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create MODEL
export const createVariant = (variantData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_VARIANT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/variant/new`,
      variantData,
      config
    );

    dispatch({
      type: CREATE_VARIANT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_VARIANT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update MODEL
export const updateVariant = (id, variantData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_VARIANT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/variant/${id}`,
      variantData,
      config
    );

    dispatch({
      type: UPDATE_VARIANT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_VARIANT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete MODEL
export const deleteVariant = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_VARIANT_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/variant/${id}`);

    dispatch({
      type: DELETE_VARIANT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_VARIANT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
