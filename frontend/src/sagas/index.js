import { all } from 'redux-saga/effects';
import appSaga from './appSaga';
import authSaga from './authSaga';

export default function* rootSaga() {
  yield all([
    ...appSaga,
    ...authSaga,
  ]);
}
