import {
  CASES_LOADING, CASES_LIST_SUCCESS, CASES_DETAIL_SUCCESS,
  CASES_CREATE_SUCCESS, CASES_UPDATE_SUCCESS, CASES_DELETE_SUCCESS, CASES_ERROR,
} from '../actions/types';

const initialState = { list: [], detail: null, loading: false, error: false };

const casesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CASES_LOADING:
      return { ...state, loading: true, error: false };
    case CASES_LIST_SUCCESS:
      return { ...state, loading: false, list: payload };
    case CASES_DETAIL_SUCCESS:
      return { ...state, loading: false, detail: payload };
    case CASES_CREATE_SUCCESS:
      return { ...state, loading: false, list: [payload, ...state.list] };
    case CASES_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        list: state.list.map((item) => (item.id === payload.id ? payload : item)),
        detail: payload,
      };
    case CASES_DELETE_SUCCESS:
      return { ...state, list: state.list.filter((item) => item.id !== payload) };
    case CASES_ERROR:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default casesReducer;
