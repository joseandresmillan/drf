import {
  BLOG_LOADING, BLOG_LIST_SUCCESS, BLOG_DETAIL_SUCCESS,
  BLOG_CREATE_SUCCESS, BLOG_UPDATE_SUCCESS, BLOG_DELETE_SUCCESS, BLOG_ERROR,
} from '../actions/types';

const initialState = {
  list: [],
  detail: null,
  loading: false,
  error: false,
};

const blogReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case BLOG_LOADING:
      return { ...state, loading: true, error: false };
    case BLOG_LIST_SUCCESS:
      return { ...state, loading: false, list: payload };
    case BLOG_DETAIL_SUCCESS:
      return { ...state, loading: false, detail: payload };
    case BLOG_CREATE_SUCCESS:
      return { ...state, loading: false, list: [payload, ...state.list] };
    case BLOG_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        list: state.list.map((item) => (item.id === payload.id ? payload : item)),
        detail: payload,
      };
    case BLOG_DELETE_SUCCESS:
      return { ...state, list: state.list.filter((item) => item.id !== payload) };
    case BLOG_ERROR:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default blogReducer;
