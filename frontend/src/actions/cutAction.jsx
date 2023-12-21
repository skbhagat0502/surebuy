import axios from "axios";

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
  UPDATE_CUT_CONSTANT_REQUEST,
  UPDATE_CUT_CONSTANT_SUCCESS,
  UPDATE_CUT_CONSTANT_FAIL,
  CUT_DETAILS_CONSTANT_REQUEST,
  CUT_DETAILS_CONSTANT_SUCCESS,
  CUT_DETAILS_CONSTANT_FAIL,
  CLEAR_ERRORS,
} from "../constants/cutConstant";

// Get All cuts
export const getAllCuts = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CUT_CONSTANT_REQUEST });

    let link = `/api/v1/cuts`;

    const { data } = await axios.get(link);

    dispatch({
      type: ALL_CUT_CONSTANT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_CUT_CONSTANT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All cuts For Admin
export const getAdminCuts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_CUT_CONSTANT_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/cuts`);
    dispatch({
      type: ADMIN_CUT_CONSTANT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_CUT_CONSTANT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create cut
export const createCut = (cutData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CUT_CONSTANT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/v1/admin/cut/new`, cutData, config);

    dispatch({
      type: CREATE_CUT_CONSTANT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_CUT_CONSTANT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update cut
export const updateCut = (id, cutData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CUT_CONSTANT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/cut/${id}`,
      cutData,
      config
    );

    dispatch({
      type: UPDATE_CUT_CONSTANT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CUT_CONSTANT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get cut Details
export const getCutDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CUT_DETAILS_CONSTANT_REQUEST });

    const { data } = await axios.get(`/api/v1/cut/${id}`);

    dispatch({
      type: CUT_DETAILS_CONSTANT_SUCCESS,
      payload: data.cut,
    });
  } catch (error) {
    dispatch({
      type: CUT_DETAILS_CONSTANT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
