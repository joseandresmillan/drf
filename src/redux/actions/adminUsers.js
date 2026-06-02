import {
  ADMIN_USERS_LOADING, ADMIN_USERS_LIST_SUCCESS, ADMIN_USERS_UPDATE_SUCCESS, ADMIN_USERS_ERROR,
} from './types';
import { apiGet, apiPatch } from '../../utils/api';

export const fetchAdminUsers = () => async (dispatch) => {
  dispatch({ type: ADMIN_USERS_LOADING });
  try {
    const res = await apiGet('/api/admin-users/');
    const data = await res.json();
    dispatch({ type: ADMIN_USERS_LIST_SUCCESS, payload: data });
  } catch {
    dispatch({ type: ADMIN_USERS_ERROR });
  }
};

export const updateAdminUser = (id, userData) => async (dispatch) => {
  try {
    const res = await apiPatch(`/api/admin-users/${id}/`, userData);
    const data = await res.json();
    if (res.ok) {
      dispatch({ type: ADMIN_USERS_UPDATE_SUCCESS, payload: data });
      return { success: true };
    }
    dispatch({ type: ADMIN_USERS_ERROR });
    return { success: false };
  } catch {
    dispatch({ type: ADMIN_USERS_ERROR });
    return { success: false };
  }
};
