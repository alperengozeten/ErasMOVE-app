import { takeEvery } from 'redux-saga/effects';


import { INIT_APP } from '../constants/actionTypes';


function initApp() {
  console.log("Init app saga")
}

const appSagas = [
  takeEvery(INIT_APP, initApp),
];

export default appSagas;
