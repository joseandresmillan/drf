import {
  CONTACTS_LOADING, CONTACTS_LIST_SUCCESS, CONTACTS_UPDATE_SUCCESS, CONTACTS_ERROR,
} from '../actions/types';

const initialState = { list: [], loading: false, error: false };

const contactsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CONTACTS_LOADING:
      return { ...state, loading: true, error: false };
    case CONTACTS_LIST_SUCCESS:
      return { ...state, loading: false, list: payload };
    case CONTACTS_UPDATE_SUCCESS:
      return {
        ...state,
        list: state.list.map((item) => (item.id === payload.id ? payload : item)),
      };
    case CONTACTS_ERROR:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default contactsReducer;
