import { takeEvery, put } from 'redux-saga/effects';

import { CREATE_APPLICATIONS_FROM_EXCEL_REQUEST, GET_COURSES_BY_DEPARTMENT_FAIL, GET_COURSES_BY_DEPARTMENT_REQUEST, GET_COURSES_BY_DEPARTMENT_SUCCESS } from '../constants/actionTypes';


function createApplicationsFromExcel({ payload: { id } }) {
  console.log(`Replacement offerd to student with id ${id}`);
}

function* getCoursesByDepartment({ payload: { type, department, university } }) {
  console.log(`Pre approval form created `);

  try {
      // TODO: send Post request here

      const status = 200;
      if (status !== 200) {
        throw Error('Accept request failed for  course approval request ');
      }

      const courses = [];

      yield put({
          type: GET_COURSES_BY_DEPARTMENT_SUCCESS,
          payload: courses,
      });
  } catch (error) {
    yield put({
      type: GET_COURSES_BY_DEPARTMENT_FAIL,
      payload: error.message,
    });
  }
}

const universitySaga = [
  takeEvery(CREATE_APPLICATIONS_FROM_EXCEL_REQUEST, createApplicationsFromExcel),
  takeEvery(GET_COURSES_BY_DEPARTMENT_REQUEST, getCoursesByDepartment),
];

export default universitySaga;
