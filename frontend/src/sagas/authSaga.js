import {
  put,
  takeEvery,
} from 'redux-saga/effects';

import {
  CHANGE_PASSWORD_REQUEST,
  //LOG_IN_FAIL,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  SEND_CODE_REQUEST,
  SEND_CODE_SUCCESS,
} from '../constants/actionTypes';

function* logInRequest({ payload: {user, navigate} }) {
  console.log('User Info: ', user);

  //TODO: API call to login 
  const userData = {};

  yield put({
    type: LOG_IN_SUCCESS,
    payload: userData,
  });
  navigate('/dash');
}

function* sendCodeRequest({ payload: email }) {
  //TODO: API call to login 

  console.log('Code Email: ', email);

  yield put({
    type: SEND_CODE_SUCCESS,
    payload: {},
  });
}

function* changePasswordRequest({ payload: user }) {
  //TODO: API call to login 
  console.log('User Info: ', user);

  yield put({
    type: LOG_IN_SUCCESS,
    payload: {},
  });
}

const loginSagas = [
  takeEvery(LOG_IN_REQUEST, logInRequest),
  takeEvery(SEND_CODE_REQUEST, sendCodeRequest),
  takeEvery(CHANGE_PASSWORD_REQUEST, changePasswordRequest),
];

export default loginSagas;
