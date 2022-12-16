import {
  call,
  delay,
  put,
  takeEvery,
} from 'redux-saga/effects';

import {
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHOOSE_AUTH_TYPE,
  CLEAR_ERRORS,
  LOG_IN_FAIL,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SEND_CODE_FAIL,
  SEND_CODE_REQUEST,
  SEND_CODE_SUCCESS,
} from '../constants/actionTypes';
import { userLogin } from '../lib/api/unsplashService';

function* logInRequest({ payload: {user, navigate} }) {
  console.log('User Info: ', user);
  
  if (user.email != '' && user.password != '') {
    if (user.typeForReq !== 'admin') {
      try {
        const response = yield call(userLogin, user.typeForReq, user.email,user.password);
        console.log('response: ', response);
    
        
        //TODO: API call to login 
        yield put({
          type: LOG_IN_SUCCESS,
          payload: Number(response.data),
        });

        // Redirect user to dashboard
        navigate('/main');
        
      } catch (error) {
        // Create error
        yield put({ type: LOG_IN_FAIL, payload: error.msg });
      }

    } else {
      // Redirect user to dashboard
      navigate('/main');
    }

  } else {
    const empty = user.email == '' ? 'email' : 'password';

    // Create error
    yield put({ type: LOG_IN_FAIL, payload: `Please fill ${empty}!` });

    // Clear errors
    yield delay(2000);
    yield put({ type: CLEAR_ERRORS });
  }

}

function* logOutRequest({ payload: navigate }) {
  //TODO: API call to send code request

  yield put({
    type: LOG_OUT_SUCCESS,
    payload: {},
  });
  yield put({ type: CHOOSE_AUTH_TYPE, authType: ''});
  navigate('/');
}

function* sendCodeRequest({ payload: email }) {
  
  console.log('Code Email: ', email);
  if (email != '') {
    //TODO: API call to send code request

    yield put({
      type: SEND_CODE_SUCCESS,
      payload: {},
    });
  } else {
    // Create error
    yield put({ type: SEND_CODE_FAIL, payload: `Please fill email!` });

    // Clear errors
    yield delay(2000);
    yield put({ type: CLEAR_ERRORS });
  }
}

function* changePasswordRequest({ payload: user }) {
  console.log('User Info: ', user);
  if (user.email != '' && user.code != '' && user.password != '' && user.password != '') {
    //TODO: API call to check code 
    
    //TODO: API call to change password 
    yield put({
      type: CHANGE_PASSWORD_SUCCESS,
      payload: {},
    });
  } else {
    // Create error
    yield put({ type: CHANGE_PASSWORD_FAIL, payload: `Please fill empty sections!` });

    // Clear errors
    yield delay(2000);
    yield put({ type: CLEAR_ERRORS });
  }
}

const loginSagas = [
  takeEvery(LOG_IN_REQUEST, logInRequest),
  takeEvery(LOG_OUT_REQUEST, logOutRequest),
  takeEvery(SEND_CODE_REQUEST, sendCodeRequest),
  takeEvery(CHANGE_PASSWORD_REQUEST, changePasswordRequest),
];

export default loginSagas;
