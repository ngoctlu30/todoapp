import * as actionTypes from '../Action/actionsTypes';
import { updateObject } from '../../Share/utility';

const initialState = {
  token: null,
  userId: null,
  email: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
}

const signupStart = (state, action) => {
  return updateObject(state, { error: null, loading: true});
}

const signupSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    userEmail: action.userEmail,
    error: null,
    loading: false
  })
}

const signupFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}

const loginStart = (state , action ) => {
  return updateObject(state, {error: null, loading: true});
}

const loginSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    userEmail: action.userEmail,
    error: null,
    loading: false
  })
}

const loginFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}

const logout = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
    userEmail: null
  })
}

const setAuthRedireactPath = (state, action) => {
  return updateObject(state, {authRedirectPath: action.path})
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.LOGIN_START: return loginStart(state, action);
    case actionTypes.LOGIN_SUCCESS: return loginSuccess(state, action);
    case actionTypes.LOGIN_FAIL: return loginFail(state, action);
    case actionTypes.LOGOUT: return logout(state, action);
    case actionTypes.SIGNUP_START: return signupStart(state, action);
    case actionTypes.SIGNUP_SUCCESS: return signupSuccess(state, action);
    case actionTypes.SIGNUP_FAIL: return signupFail(state, action);
    case actionTypes.SETAUTH_REDIRECT_PATH: return setAuthRedireactPath(state, action);
    default: return state;
  }
}

export default reducer;