import {
    AUTH_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL
} from '../actions/types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    loading: false
};

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case AUTH_LOADING:
            return {
                ...state,
                loading: true
            };
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh,
                loading: false
            }
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload,
                loading: false
            }
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null,
                loading: false
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            };
        case SIGNUP_FAIL:
            return {
                ...state,
                isAuthenticated: false
            };
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null
            }
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                loading: false
            }
        default:
            return state
    }
};

export default authReducer;
