import {
  SERVICE_CATEGORIES_LOADING,
  SERVICE_CATEGORIES_LIST_SUCCESS,
  SERVICE_CATEGORIES_CREATE_SUCCESS,
  SERVICE_CATEGORIES_UPDATE_SUCCESS,
  SERVICE_CATEGORIES_DELETE_SUCCESS,
  SERVICE_CATEGORIES_ERROR,
} from './types';
import { apiGet, apiPost, apiPut, apiDelete } from '../../utils/api';

export const fetchServiceCategories = () => async (dispatch) => {
  dispatch({ type: SERVICE_CATEGORIES_LOADING });
  try {
    const res = await apiGet('/api/service-categories/');
    const data = await res.json();
    dispatch({ type: SERVICE_CATEGORIES_LIST_SUCCESS, payload: data });
  } catch {
    dispatch({ type: SERVICE_CATEGORIES_ERROR });
  }
};

export const createServiceCategory = (categoryData) => async (dispatch) => {
  dispatch({ type: SERVICE_CATEGORIES_LOADING });
  try {
    const res = await apiPost('/api/service-categories/', categoryData);
    const data = await res.json();
    if (res.ok) {
      dispatch({ type: SERVICE_CATEGORIES_CREATE_SUCCESS, payload: data });
      return { success: true, data };
    }
    dispatch({ type: SERVICE_CATEGORIES_ERROR });
    return { success: false, errors: data };
  } catch {
    dispatch({ type: SERVICE_CATEGORIES_ERROR });
    return { success: false, errors: {} };
  }
};

export const updateServiceCategory = (id, categoryData) => async (dispatch) => {
  dispatch({ type: SERVICE_CATEGORIES_LOADING });
  try {
    const res = await apiPut(`/api/service-categories/${id}/`, categoryData);
    const data = await res.json();
    if (res.ok) {
      dispatch({ type: SERVICE_CATEGORIES_UPDATE_SUCCESS, payload: data });
      return { success: true };
    }
    dispatch({ type: SERVICE_CATEGORIES_ERROR });
    return { success: false, errors: data };
  } catch {
    dispatch({ type: SERVICE_CATEGORIES_ERROR });
    return { success: false, errors: {} };
  }
};

export const deleteServiceCategory = (id) => async (dispatch) => {
  try {
    const res = await apiDelete(`/api/service-categories/${id}/`);
    if (res.ok) {
      dispatch({ type: SERVICE_CATEGORIES_DELETE_SUCCESS, payload: id });
      return { success: true };
    }
    return { success: false };
  } catch {
    return { success: false };
  }
};
