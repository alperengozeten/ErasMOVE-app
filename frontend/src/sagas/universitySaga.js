import { takeEvery } from 'redux-saga/effects';


import { CREATE_APPLICATIONS_FROM_EXCEL_REQUEST } from '../constants/actionTypes';


function createApplicationsFromExcel({ payload: { id } }) {
  console.log(`Replacement offerd to student with id ${id}`);
}

const universitySaga = [
  takeEvery(CREATE_APPLICATIONS_FROM_EXCEL_REQUEST, createApplicationsFromExcel),
];

export default universitySaga;
