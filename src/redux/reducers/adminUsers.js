import {
  ADMIN_USERS_LOADING, ADMIN_USERS_LIST_SUCCESS, ADMIN_USERS_UPDATE_SUCCESS, ADMIN_USERS_ERROR,
} from '../actions/types';

const initialState = { list: [], loading: false, error: false };

const adminUsersReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADMIN_USERS_LOADING:
      return { ...state, loading: true, error: false };
    case ADMIN_USERS_LIST_SUCCESS:
      return { ...state, loading: false, list: payload };
    case ADMIN_USERS_UPDATE_SUCCESS:
      return {
        ...state,
        list: state.list.map((item) => (item.id === payload.id ? payload : item)),
      };
    case ADMIN_USERS_ERROR:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default adminUsersReducer;
