import {
  CASES_LOADING, CASES_LIST_SUCCESS, CASES_DETAIL_SUCCESS,
  CASES_CREATE_SUCCESS, CASES_UPDATE_SUCCESS, CASES_DELETE_SUCCESS, CASES_ERROR,
} from './types';
import { apiGet, apiPost, apiPut, apiDelete } from '../../utils/api';

export const fetchCases = () => async (dispatch) => {
  dispatch({ type: CASES_LOADING });
  try {
    const res = await apiGet('/api/cases/');
    const data = await res.json();
    dispatch({ type: CASES_LIST_SUCCESS, payload: data });
  } catch {
    dispatch({ type: CASES_ERROR });
  }
};

export const fetchCaseDetail = (id) => async (dispatch) => {
  dispatch({ type: CASES_LOADING });
  try {
    const res = await apiGet(`/api/cases/${id}/`);
    const data = await res.json();
    dispatch({ type: CASES_DETAIL_SUCCESS, payload: data });
  } catch {
    dispatch({ type: CASES_ERROR });
  }
};

export const createCase = (caseData) => async (dispatch) => {
  dispatch({ type: CASES_LOADING });
  try {
    const res = await apiPost('/api/cases/', caseData);
    const data = await res.json();
    if (res.ok) {
      dispatch({ type: CASES_CREATE_SUCCESS, payload: data });
      return { success: true, data };
    }
    dispatch({ type: CASES_ERROR, payload: data });
    return { success: false, errors: data };
  } catch {
    dispatch({ type: CASES_ERROR });
    return { success: false };
  }
};

export const updateCase = (id, caseData) => async (dispatch) => {
  dispatch({ type: CASES_LOADING });
  try {
    const res = await apiPut(`/api/cases/${id}/`, caseData);
    const data = await res.json();
    if (res.ok) {
      dispatch({ type: CASES_UPDATE_SUCCESS, payload: data });
      return { success: true, data };
    }
    dispatch({ type: CASES_ERROR, payload: data });
    return { success: false, errors: data };
  } catch {
    dispatch({ type: CASES_ERROR });
    return { success: false };
  }
};

export const deleteCase = (id) => async (dispatch) => {
  try {
    const res = await apiDelete(`/api/cases/${id}/`);
    if (res.ok) {
      dispatch({ type: CASES_DELETE_SUCCESS, payload: id });
      return { success: true };
    }
    return { success: false };
  } catch {
    dispatch({ type: CASES_ERROR });
    return { success: false };
  }
};
