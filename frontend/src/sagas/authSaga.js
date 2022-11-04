/* eslint-disable prefer-arrow-callback */
import {
  put,
  takeEvery,
} from 'redux-saga/effects';

import {
  //LOG_IN_FAIL,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
} from '../constants/actionTypes';

function* logInRequest({ payload: navigate }) {
  //TODO: API call to login 
  const userData = {};

  yield put({
    type: LOG_IN_SUCCESS,
    payload: userData,
  });
  navigate('/dash');
}

const loginSagas = [
  takeEvery(LOG_IN_REQUEST, logInRequest),
];

export default loginSagas;
