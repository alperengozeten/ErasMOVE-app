import { takeEvery, put, call } from 'redux-saga/effects';
import { GET_APPLICATION_FAIL, GET_APPLICATION_REQUEST, GET_APPLICATION_SUCCESS, GET_NOTIFICATIONS_FAIL, GET_NOTIFICATIONS_REQUEST, GET_NOTIFICATIONS_SUCCESS, GET_USER_FAIL, GET_USER_REQUEST, GET_USER_SUCCESS } from '../constants/actionTypes';
import { getApplication, getNotifications, getUser } from '../lib/api/unsplashService';

function* getUserRequest({ payload: { id, typeForReq } }) {
  console.log(`Get user `);

  try {
      // TODO: send Post request here
      const { data } = yield call(getUser, typeForReq, id);

      const status = 200;
      if (status !== 200) {
        throw Error('Accept request failed for  course approval request ');
      }

      yield put({
          type: GET_USER_SUCCESS,
          payload: data,
      });
  } catch (error) {
    yield put({
      type: GET_USER_FAIL,
      payload: error.message,
    });
  }
}

function* getApplicationRequest({ payload: { id } }) {
    console.log(`Get application`);
  
    try {
        // TODO: send Post request here
        const { data } = yield call(getApplication, id);
  
        const status = 200;
        if (status !== 200) {
          throw Error('Accept request failed for  course approval request ');
        }
  
        yield put({
            type: GET_APPLICATION_SUCCESS,
            payload: data,
        });
    } catch (error) {
      yield put({
        type: GET_APPLICATION_FAIL,
        payload: error.message,
      });
    }
  }

  function* getNotificationsRequest({ payload: { id } }) {
    console.log(`Get notifications`);
  
    try {
        // TODO: send Post request here
        const { data } = yield call(getNotifications, id);
  
        const status = 200;
        if (status !== 200) {
          throw Error('Accept request failed for  course approval request ');
        }
  
        yield put({
            type: GET_NOTIFICATIONS_SUCCESS,
            payload: data,
        });
    } catch (error) {
      yield put({
        type: GET_NOTIFICATIONS_FAIL,
        payload: error.message,
      });
    }
  }

const userSaga = [
  takeEvery(GET_USER_REQUEST, getUserRequest),
  takeEvery(GET_APPLICATION_REQUEST, getApplicationRequest),
  takeEvery(GET_NOTIFICATIONS_REQUEST, getNotificationsRequest),
];

export default userSaga;
