import {
  SERVICES_LOADING, SERVICES_LIST_SUCCESS, SERVICES_DETAIL_SUCCESS,
  SERVICES_CREATE_SUCCESS, SERVICES_UPDATE_SUCCESS, SERVICES_DELETE_SUCCESS, SERVICES_ERROR,
} from '../actions/types';

const initialState = { list: [], detail: null, loading: false, error: false };

const servicesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SERVICES_LOADING:
      return { ...state, loading: true, error: false };
    case SERVICES_LIST_SUCCESS:
      return { ...state, loading: false, list: payload };
    case SERVICES_DETAIL_SUCCESS:
      return { ...state, loading: false, detail: payload };
    case SERVICES_CREATE_SUCCESS:
      return { ...state, loading: false, list: [...state.list, payload] };
    case SERVICES_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        list: state.list.map((item) => (item.id === payload.id ? payload : item)),
        detail: payload,
      };
    case SERVICES_DELETE_SUCCESS:
      return { ...state, list: state.list.filter((item) => item.id !== payload) };
    case SERVICES_ERROR:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default servicesReducer;
