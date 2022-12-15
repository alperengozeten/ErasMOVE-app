import { takeEvery, put, call } from 'redux-saga/effects';

import { CREATE_APPLICATIONS_FROM_EXCEL_REQUEST, GET_COURSES_BY_DEPARTMENT_FAIL, GET_COURSES_BY_DEPARTMENT_REQUEST, GET_COURSES_BY_DEPARTMENT_SUCCESS, GET_DEPARTMENTS_FAIL, GET_DEPARTMENTS_REQUEST, GET_DEPARTMENTS_SUCCESS } from '../constants/actionTypes';
import { getDepartments } from '../lib/api/unsplashService';


function createApplicationsFromExcel({ payload: { id } }) {
  console.log(`Replacement offerd to student with id ${id}`);
}

function* getCoursesByDepartment({ payload: { type, department, university } }) {
  console.log(`Get courses ${type} ${department} ${university}`);

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

function* getDepartmentsFunc() {
  console.log(`Get departments `);

  try {
      // TODO: send Post request here
      const { data } = yield call(getDepartments);
      console.log(data);

      const status = 200;
      if (status !== 200) {
        throw Error('Accept request failed for  course approval request ');
      }

      yield put({
          type: GET_DEPARTMENTS_SUCCESS,
          payload: data,
      });
  } catch (error) {
    yield put({
      type: GET_DEPARTMENTS_FAIL,
      payload: error.message,
    });
  }
}

const universitySaga = [
  takeEvery(CREATE_APPLICATIONS_FROM_EXCEL_REQUEST, createApplicationsFromExcel),
  takeEvery(GET_COURSES_BY_DEPARTMENT_REQUEST, getCoursesByDepartment),
  takeEvery(GET_DEPARTMENTS_REQUEST, getDepartmentsFunc),
];

export default universitySaga;
