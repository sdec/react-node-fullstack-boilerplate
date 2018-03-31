import { createAction, handleActions } from 'redux-actions';
import { AuthAPIService } from '../../shared/services/AuthAPIService';
import { sessionSelector } from './session.selectors';

// Actions
const SESSION_LOGIN_LOCAL_REQUEST = 'react-node-fullstack-boilerplate/user/SESSION_LOGIN_LOCAL';
const SESSION_LOGIN_LOCAL_SUCCESS = 'react-node-fullstack-boilerplate/user/SESSION_LOGIN_LOCAL_SUCCESS';
const SESSION_LOGIN_LOCAL_FAILURE = 'react-node-fullstack-boilerplate/user/SESSION_LOGIN_LOCAL_FAILURE';

const SESSION_SIGNUP_LOCAL_REQUEST = 'react-node-fullstack-boilerplate/user/SESSION_SIGNUP_LOCAL';
const SESSION_SIGNUP_LOCAL_SUCCESS = 'react-node-fullstack-boilerplate/user/SESSION_SIGNUP_LOCAL_SUCCESS';
const SESSION_SIGNUP_LOCAL_FAILURE = 'react-node-fullstack-boilerplate/user/SESSION_SIGNUP_LOCAL_FAILURE';

const SESSION_LOGOUT_REQUEST = 'react-node-fullstack-boilerplate/user/SESSION_LOGOUT';
const SESSION_LOGOUT_SUCCESS = 'react-node-fullstack-boilerplate/user/SESSION_LOGOUT_SUCCESS';
const SESSION_LOGOUT_FAILURE = 'react-node-fullstack-boilerplate/user/SESSION_LOGOUT_FAILURE';

export const sessionLoginLocalRequestAction = createAction(SESSION_LOGIN_LOCAL_REQUEST);
export const sessionLoginLocalSuccessAction = createAction(SESSION_LOGIN_LOCAL_SUCCESS);
export const sessionLoginLocalFailureAction = createAction(SESSION_LOGIN_LOCAL_FAILURE);

export const sessionSignupLocalRequestAction = createAction(SESSION_SIGNUP_LOCAL_REQUEST);
export const sessionSignupLocalSuccessAction = createAction(SESSION_SIGNUP_LOCAL_SUCCESS);
export const sessionSignupLocalFailureAction = createAction(SESSION_SIGNUP_LOCAL_FAILURE);

export const sessionLogoutRequestAction = createAction(SESSION_LOGOUT_REQUEST);
export const sessionLogoutSuccessAction = createAction(SESSION_LOGOUT_SUCCESS);
export const sessionLogoutFailureAction = createAction(SESSION_LOGOUT_FAILURE);

// Initial state
const defaultState = {
  loading: false,
  error: false,
  errorResponse: undefined,
  data: undefined
};

// Reducer
export default handleActions(
  {
    [SESSION_LOGIN_LOCAL_REQUEST]: (state) => ({
      ...state,
      loading: true,
      error: false,
      errorResponse: undefined
    }),

    [SESSION_LOGIN_LOCAL_SUCCESS]: (state, action) => {
      return {
        ...state,
        loading: false,
        data: action.payload.data.payload
      };
    },

    [SESSION_LOGIN_LOCAL_FAILURE]: (state, action) => ({
      ...state,
      loading: false,
      error: true,
      errorResponse: action.payload,
      data: undefined
    }),

    [SESSION_SIGNUP_LOCAL_REQUEST]: (state) => ({
      ...state,
      loading: true,
      error: false,
      errorResponse: undefined
    }),

    [SESSION_SIGNUP_LOCAL_SUCCESS]: (state, action) => {
      return {
        ...state,
        loading: false,
        data: action.payload.data.payload
      };
    },

    [SESSION_SIGNUP_LOCAL_FAILURE]: (state, action) => ({
      ...state,
      loading: false,
      error: true,
      errorResponse: action.payload,
      data: undefined
    }),

    [SESSION_LOGOUT_REQUEST]: (state) => ({
      ...state,
      loading: true,
      error: false,
      errorResponse: undefined
    }),

    [SESSION_LOGOUT_SUCCESS]: (state) => {
      return {
        ...state,
        loading: false,
        data: undefined
      };
    },

    [SESSION_LOGOUT_FAILURE]: (state, action) => ({
      ...state,
      loading: false,
      error: true,
      errorResponse: action.payload,
      data: undefined
    })
  },
  defaultState
);

// Action Creators
export function loginLocalRequest() {
  return sessionLoginLocalRequestAction();
}

export function loginLocalSuccess(response) {
  return sessionLoginLocalSuccessAction(response);
}

export function loginLocalFailure(response) {
  return sessionLoginLocalFailureAction(response);
}

export function signupLocalRequest() {
  return sessionSignupLocalRequestAction();
}

export function signupLocalSuccess(response) {
  return sessionSignupLocalSuccessAction(response);
}

export function signupLocalFailure(response) {
  return sessionSignupLocalFailureAction(response);
}

export function logoutRequest() {
  return sessionLogoutRequestAction();
}

export function logoutSuccess(response) {
  return sessionLogoutSuccessAction(response);
}

export function logoutFailure(response) {
  return sessionLogoutFailureAction(response);
}

// Thunks
export function loginLocal(payload) {
  return (dispatch) => {
    dispatch(loginLocalRequest());

    return AuthAPIService.loginLocal(payload)
      .then((response) => {
        dispatch(loginLocalSuccess(response));
        return Promise.resolve(response);
      })
      .catch((error) => {
        dispatch(loginLocalFailure(error));
        return Promise.reject(error);
      });
  };
}

export function signupLocal(payload) {
  return (dispatch) => {
    dispatch(signupLocalRequest());

    return AuthAPIService.signupLocal(payload)
      .then((response) => {
        dispatch(signupLocalSuccess(response));
        return Promise.resolve(response);
      })
      .catch((error) => {
        dispatch(signupLocalFailure(error));
        return Promise.reject(error);
      });
  };
}

export function verifyToken() {
  return (dispatch, getState) => {
    const state = getState();
    const sessionState = state.session;
    const session = sessionSelector(sessionState);

    if (!session.isLoggedIn()) {
      return Promise.resolve(true);
    }

    return AuthAPIService.verifyToken(session)
      .then((response) => (response && response.data && response.data.payload) || false)
      .catch(() => false);
  };
}

export function forgotPassword(payload) {
  return (dispatch) => {
    return AuthAPIService.forgotPassword(payload);
  };
}

export function forgotPasswordReset(payload) {
  return (dispatch) => {
    return AuthAPIService.forgotPasswordReset(payload);
  };
}

export function logout() {
  return (dispatch) => {
    dispatch(logoutRequest());

    return AuthAPIService.logout()
      .then((response) => {
        dispatch(logoutSuccess(response));
        return Promise.resolve(response);
      })
      .catch((error) => {
        dispatch(logoutFailure(error));
        return Promise.reject(error);
      });
  };
}
