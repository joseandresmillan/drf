import {
  SERVICE_CATEGORIES_LOADING,
  SERVICE_CATEGORIES_LIST_SUCCESS,
  SERVICE_CATEGORIES_CREATE_SUCCESS,
  SERVICE_CATEGORIES_UPDATE_SUCCESS,
  SERVICE_CATEGORIES_DELETE_SUCCESS,
  SERVICE_CATEGORIES_ERROR,
} from '../actions/types';

const initialState = {
  list: [],
  loading: false,
  error: false,
};

const serviceCategoriesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SERVICE_CATEGORIES_LOADING:
      return { ...state, loading: true, error: false };
    case SERVICE_CATEGORIES_LIST_SUCCESS:
      return { ...state, loading: false, list: payload };
    case SERVICE_CATEGORIES_CREATE_SUCCESS:
      return { ...state, loading: false, list: [...state.list, payload] };
    case SERVICE_CATEGORIES_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        list: state.list.map((item) => (item.id === payload.id ? payload : item)),
      };
    case SERVICE_CATEGORIES_DELETE_SUCCESS:
      return { ...state, list: state.list.filter((item) => item.id !== payload) };
    case SERVICE_CATEGORIES_ERROR:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default serviceCategoriesReducer;
