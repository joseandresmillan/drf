import {
  CATEGORIES_LOADING, CATEGORIES_LIST_SUCCESS,
  CATEGORIES_CREATE_SUCCESS, CATEGORIES_UPDATE_SUCCESS,
  CATEGORIES_DELETE_SUCCESS, CATEGORIES_ERROR,
} from './types';
import { apiGet, apiPost, apiPut, apiDelete } from '../../utils/api';

export const fetchCategories = () => async (dispatch) => {
  dispatch({ type: CATEGORIES_LOADING });
  try {
    const res = await apiGet('/api/categories/');
    const data = await res.json();
    dispatch({ type: CATEGORIES_LIST_SUCCESS, payload: data });
  } catch {
    dispatch({ type: CATEGORIES_ERROR });
  }
};

export const createCategory = (categoryData) => async (dispatch) => {
  dispatch({ type: CATEGORIES_LOADING });
  try {
    const res = await apiPost('/api/categories/', categoryData);
    const data = await res.json();
    if (res.ok) {
      dispatch({ type: CATEGORIES_CREATE_SUCCESS, payload: data });
      return { success: true, data };
    }
    dispatch({ type: CATEGORIES_ERROR });
    return { success: false, errors: data };
  } catch {
    dispatch({ type: CATEGORIES_ERROR });
    return { success: false, errors: {} };
  }
};

export const updateCategory = (id, categoryData) => async (dispatch) => {
  dispatch({ type: CATEGORIES_LOADING });
  try {
    const res = await apiPut(`/api/categories/${id}/`, categoryData);
    const data = await res.json();
    if (res.ok) {
      dispatch({ type: CATEGORIES_UPDATE_SUCCESS, payload: data });
      return { success: true };
    }
    dispatch({ type: CATEGORIES_ERROR });
    return { success: false, errors: data };
  } catch {
    dispatch({ type: CATEGORIES_ERROR });
    return { success: false, errors: {} };
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    const res = await apiDelete(`/api/categories/${id}/`);
    if (res.ok) {
      dispatch({ type: CATEGORIES_DELETE_SUCCESS, payload: id });
      return { success: true };
    }
    return { success: false };
  } catch {
    return { success: false };
  }
};
