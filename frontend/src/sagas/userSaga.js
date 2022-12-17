import { takeEvery, put, call } from 'redux-saga/effects';
import { GET_APPLICATION_FAIL, GET_APPLICATION_REQUEST, GET_APPLICATION_SUCCESS, GET_NOTIFICATIONS_FAIL, GET_NOTIFICATIONS_REQUEST, GET_NOTIFICATIONS_SUCCESS, GET_USER_FAIL, GET_USER_REQUEST, GET_USER_SUCCESS, MARK_NOTIFICATION_READ_FAIL, MARK_NOTIFICATION_READ_REQUEST, MARK_NOTIFICATION_READ_SUCCESS } from '../constants/actionTypes';
import { getAcceptedErasmusDepartment, getAcceptedErasmusUniversity, getAcceptedExchangeDepartment, getAcceptedExchangeUniversity, getApplication, getNotifications, getUser, markAsReadNotification } from '../lib/api/unsplashService';

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
        const { data: application } = yield call(getApplication, id);

        if(application?.admittedStatus !== "NOT ADMITTED" && application?.outgoingStudent?.isErasmus) {
          const { data: university } = yield call(getAcceptedErasmusUniversity, id);
          const { data: department } = yield call(getAcceptedErasmusDepartment, id);

          application.acceptedUniversity = university;
          application.acceptedDepartment = department;
        } else if(application?.admittedStatus !== "NOT ADMITTED" && !application?.outgoingStudent?.isErasmus) {
          const { data: university } = yield call(getAcceptedExchangeUniversity, id);
          const { data: department } = yield call(getAcceptedExchangeDepartment, id);

          application.acceptedUniversity = university;
          application.acceptedDepartment = department;
        }
  
        const status = 200;
        if (status !== 200) {
          throw Error('Accept request failed for  course approval request ');
        }
  
        yield put({
            type: GET_APPLICATION_SUCCESS,
            payload: application,
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

  function* markNotificationReadRequest({ payload: { id } }) {
    console.log(`Get notifications`);
  
    try {
        yield call(markAsReadNotification, id);
  
        const status = 200;
        if (status !== 200) {
          throw Error('Accept request failed for  course approval request ');
        }
  
        yield put({
            type: MARK_NOTIFICATION_READ_SUCCESS,
            payload: id,
        });
    } catch (error) {
      yield put({
        type: MARK_NOTIFICATION_READ_FAIL,
        payload: error.message,
      });
    }
  }
const userSaga = [
  takeEvery(GET_USER_REQUEST, getUserRequest),
  takeEvery(GET_APPLICATION_REQUEST, getApplicationRequest),
  takeEvery(GET_NOTIFICATIONS_REQUEST, getNotificationsRequest),
  takeEvery(MARK_NOTIFICATION_READ_REQUEST, markNotificationReadRequest),
];

export default userSaga;
