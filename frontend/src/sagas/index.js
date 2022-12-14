import { all } from 'redux-saga/effects';
import appSaga from './appSaga';
import authSaga from './authSaga';
import requestSaga from './requestSaga';
import universitySaga from './universitySaga';
import userSaga from './userSaga';
import applicationSaga from './applicationSaga';
import announcementSaga from './announcementSaga';

export default function* rootSaga() {
  yield all([
    ...appSaga,
    ...authSaga,
    ...requestSaga,
    ...universitySaga,
    ...userSaga,
    ...applicationSaga,
    ...announcementSaga,
  ]);
}
