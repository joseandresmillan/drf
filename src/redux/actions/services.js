import {
  SERVICES_LOADING, SERVICES_LIST_SUCCESS, SERVICES_DETAIL_SUCCESS,
  SERVICES_CREATE_SUCCESS, SERVICES_UPDATE_SUCCESS, SERVICES_DELETE_SUCCESS, SERVICES_ERROR,
} from './types';
import { apiGet, apiPost, apiPut, apiDelete } from '../../utils/api';

export const fetchServices = () => async (dispatch) => {
  dispatch({ type: SERVICES_LOADING });
  try {
    const res = await apiGet('/api/services/');
    const data = await res.json();
    dispatch({ type: SERVICES_LIST_SUCCESS, payload: data });
  } catch {
    dispatch({ type: SERVICES_ERROR });
  }
};

export const fetchServiceDetail = (id) => async (dispatch) => {
  dispatch({ type: SERVICES_LOADING });
  try {
    const res = await apiGet(`/api/services/${id}/`);
    const data = await res.json();
    dispatch({ type: SERVICES_DETAIL_SUCCESS, payload: data });
  } catch {
    dispatch({ type: SERVICES_ERROR });
  }
};

export const createService = (serviceData) => async (dispatch) => {
  dispatch({ type: SERVICES_LOADING });
  try {
    const res = await apiPost('/api/services/', serviceData);
    const data = await res.json();
    if (res.ok) {
      dispatch({ type: SERVICES_CREATE_SUCCESS, payload: data });
      return { success: true, data };
    }
    dispatch({ type: SERVICES_ERROR, payload: data });
    return { success: false, errors: data };
  } catch {
    dispatch({ type: SERVICES_ERROR });
    return { success: false };
  }
};

export const updateService = (id, serviceData) => async (dispatch) => {
  dispatch({ type: SERVICES_LOADING });
  try {
    const res = await apiPut(`/api/services/${id}/`, serviceData);
    const data = await res.json();
    if (res.ok) {
      dispatch({ type: SERVICES_UPDATE_SUCCESS, payload: data });
      return { success: true, data };
    }
    dispatch({ type: SERVICES_ERROR, payload: data });
    return { success: false, errors: data };
  } catch {
    dispatch({ type: SERVICES_ERROR });
    return { success: false };
  }
};

export const deleteService = (id) => async (dispatch) => {
  try {
    const res = await apiDelete(`/api/services/${id}/`);
    if (res.ok) {
      dispatch({ type: SERVICES_DELETE_SUCCESS, payload: id });
      return { success: true };
    }
    return { success: false };
  } catch {
    dispatch({ type: SERVICES_ERROR });
    return { success: false };
  }
};
