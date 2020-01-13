
import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const signupStart = () => {
  return {
    type: actionTypes.SIGNUP_START 
  }
}

export const signupSuccess = (token, userId, userEmail) => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    idToken: token,
    userId: userId,
    userEmail: userEmail
  }
}

export const signupFail = (error) => {
  return {
    type: actionTypes.SIGNUP_FAIL,
    error: error
  }
}

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START
  }
}

export const loginSuccess = (token, userId, userEmail) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    idToken: token,
    userId: userId,
    userEmail: userEmail
  }
}

export const loginFail = (error) => {
  return {
    type: actionTypes.LOGIN_FAIL,
    error: error
  }
}

export const logout = () => {
  localStorage.removeItem('email');
  localStorage.removeItem('userId');
  localStorage.removeItem('token');
  localStorage.removeItem('expirationTime');
  return {
    type: actionTypes.LOGOUT
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SETAUTH_REDIRECT_PATH,
    path: path
  }
}

export const checkLoginTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  }
}
export const authSignUp = (email, password) => {
  return dispatch => {
    dispatch(signupStart());
    const signupData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAKsArj449ASjV4OTZsBuE6V8zgqgjrZpw';
    axios.post(url, signupData )
      .then( res => {
        const expirationTime = new Date( new Date().getTime() + res.data.expiresIn * 1000);
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('userId', res.data.localId);
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationTime', expirationTime);
        dispatch(signupSuccess(res.data.idToken, res.data.localId, res.data.email));
        dispatch(checkLoginTimeout(res.data.expiresIn));
      })
      .catch(err => {
        dispatch(signupFail(err.response.data.error));
      })
  }
}

export const authSignIn = (email, password) => {
  return dispatch => {
    dispatch(loginStart());
    const loginData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAKsArj449ASjV4OTZsBuE6V8zgqgjrZpw'
    
    axios.post(url, loginData)
      .then(res => {
        const expirationTime = new Date( new Date().getTime() + res.data.expiresIn * 1000);
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('userId', res.data.localId);
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationTime', expirationTime);
        dispatch(loginSuccess(res.data.idToken, res.data.localId, res.data.email));
        dispatch(checkLoginTimeout(res.data.expiresIn));
      })
      .catch(err => {
        dispatch(loginFail(err.response.data.error));
      })

  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if(!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date( localStorage.getItem('expirationTime') );
      if(expirationDate < new Date()) {
        dispatch(logout());
      }
      else {
        const userId = localStorage.getItem('userId');
        const email = localStorage.getItem('email');
        dispatch(loginSuccess(token, userId, email));
        dispatch(checkLoginTimeout( (expirationDate.getTime() - new Date().getTime())/1000 ))
      }
    }

  }
}