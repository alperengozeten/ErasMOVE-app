import {
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
  GET_USER,
  LOG_IN_FAIL,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_REQUEST,
  SEND_CODE_FAIL,
  SEND_CODE_REQUEST,
  SEND_CODE_SUCCESS,
} from '../constants/actionTypes';

function* logInRequest({ payload: {user, navigate} }) {
  console.log('User Info: ', user);

  const outgoingStudent = {
    type: 'Outgoing Student',
    name: 'John Doe',
    email: 'john@bilkent.edu.tr',
    studentInfo: {
      studentID: '21902131',
      semesterNo: 7,
      departmentName: 'Computer Science',
    },
  };
  
  if (user.email != '' && user.password != '') {
    //TODO: API call to login 
    const key = 123;
    yield put({
      type: LOG_IN_SUCCESS,
      payload: key,
    });

    //TODO: API call to get user details 
    yield put({
      type: GET_USER,
      payload: outgoingStudent,
    });

    // Redirect user to dashboard
    navigate('/main');
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
    type: SEND_CODE_SUCCESS,
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
