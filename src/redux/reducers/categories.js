import {
  CATEGORIES_LOADING, CATEGORIES_LIST_SUCCESS,
  CATEGORIES_CREATE_SUCCESS, CATEGORIES_UPDATE_SUCCESS,
  CATEGORIES_DELETE_SUCCESS, CATEGORIES_ERROR,
} from '../actions/types';

const initialState = {
  list: [],
  loading: false,
  error: false,
};

const categoriesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CATEGORIES_LOADING:
      return { ...state, loading: true, error: false };
    case CATEGORIES_LIST_SUCCESS:
      return { ...state, loading: false, list: payload };
    case CATEGORIES_CREATE_SUCCESS:
      return { ...state, loading: false, list: [...state.list, payload] };
    case CATEGORIES_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        list: state.list.map((item) => (item.id === payload.id ? payload : item)),
      };
    case CATEGORIES_DELETE_SUCCESS:
      return { ...state, list: state.list.filter((item) => item.id !== payload) };
    case CATEGORIES_ERROR:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default categoriesReducer;
