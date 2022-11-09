import {
  delay,
  put,
  takeEvery,
} from 'redux-saga/effects';

import {
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CLEAR_ERRORS,
  LOG_IN_FAIL,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  SEND_CODE_FAIL,
  SEND_CODE_REQUEST,
  SEND_CODE_SUCCESS,
} from '../constants/actionTypes';

function* logInRequest({ payload: {user, navigate} }) {
  console.log('User Info: ', user);

  //TODO: API call to login 
  const userData = {};
  if (user.email != '' && user.password != '') {
    yield put({
      type: LOG_IN_SUCCESS,
      payload: userData,
    });
    navigate('/dash');
  } else {
    const empty = user.email == '' ? 'email' : 'password';

    // Create error
    yield put({ type: LOG_IN_FAIL, payload: `Please fill ${empty}!` });

    // Clear errors
    yield delay(2000);
    yield put({ type: CLEAR_ERRORS });
  }

}

function* sendCodeRequest({ payload: email }) {
  //TODO: API call to login 

  console.log('Code Email: ', email);
  if (email != '') {
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
  //TODO: API call to login 
  console.log('User Info: ', user);
  if (user.email != '' && user.code != '' && user.password != '' && user.password != '') {
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
  takeEvery(SEND_CODE_REQUEST, sendCodeRequest),
  takeEvery(CHANGE_PASSWORD_REQUEST, changePasswordRequest),
];

export default loginSagas;
