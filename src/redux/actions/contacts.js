import {
  CONTACTS_LOADING, CONTACTS_LIST_SUCCESS, CONTACTS_UPDATE_SUCCESS, CONTACTS_ERROR,
} from './types';
import { apiGet, apiPatch } from '../../utils/api';

export const fetchContacts = () => async (dispatch) => {
  dispatch({ type: CONTACTS_LOADING });
  try {
    const res = await apiGet('/api/contacts/');
    const data = await res.json();
    dispatch({ type: CONTACTS_LIST_SUCCESS, payload: data });
  } catch {
    dispatch({ type: CONTACTS_ERROR });
  }
};

export const updateContactStatus = (id, status) => async (dispatch) => {
  try {
    const res = await apiPatch(`/api/contacts/${id}/`, { status });
    const data = await res.json();
    if (res.ok) {
      dispatch({ type: CONTACTS_UPDATE_SUCCESS, payload: data });
      return { success: true };
    }
    dispatch({ type: CONTACTS_ERROR });
    return { success: false };
  } catch {
    dispatch({ type: CONTACTS_ERROR });
    return { success: false };
  }
};
