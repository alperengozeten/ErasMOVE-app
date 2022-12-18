import { takeEvery, put, call } from 'redux-saga/effects';

import { ADD_COURSE_TO_DEPARTMENT_FAIL, ADD_COURSE_TO_DEPARTMENT_REQUEST, ADD_COURSE_TO_DEPARTMENT_SUCCESS, ADD_HOST_DEPARTMENT_FAIL, ADD_HOST_DEPARTMENT_REQUEST, ADD_HOST_DEPARTMENT_SUCCESS, CREATE_APPLICATIONS_FROM_EXCEL_REQUEST, GET_COURSES_BY_DEPARTMENT_FAIL, GET_COURSES_BY_DEPARTMENT_REQUEST, GET_COURSES_BY_DEPARTMENT_SUCCESS, GET_DEPARTMENTS_FAIL, GET_DEPARTMENTS_REQUEST, GET_DEPARTMENTS_SUCCESS, GET_UNIVERSITIES_FAIL, GET_UNIVERSITIES_REQUEST, GET_UNIVERSITIES_SUCCESS } from '../constants/actionTypes';
import { addDepartment, addElectiveCourseToDepartment, addMandatoryCourseToDepartment, getDepartments, getErasmusUniversities, getExchangeUniversities } from '../lib/api/unsplashService';


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

function* addHostDepartmentFunc({ payload: {departmentName} }) {
  console.log(`ADD department ${departmentName}`);

  
  try {
      const department = {
        departmentName: departmentName,
        courseList: []
      };
      console.log('dep: ', department);
      // TODO: send Post request here
      const { data } = yield call(addDepartment, department);
      console.log(data);

      const status = 200;
      if (status !== 200) {
        throw Error('Accept request failed for  course approval request ');
      }

      yield put({
          type: ADD_HOST_DEPARTMENT_SUCCESS,
          payload: department,
      });
  } catch (error) {
    yield put({
      type: ADD_HOST_DEPARTMENT_FAIL,
      payload: error.message,
    });
  }
}

function* addCourseToDepartmentRequest({ payload: { course, departmentID, type } }) {
  console.log(`ADD course ${course}`);
  
  try {
      if (type === "Elective") {
        const { data } = yield call(addElectiveCourseToDepartment, departmentID, course);
        console.log(data);
      } else {
        const { data } = yield call(addMandatoryCourseToDepartment, departmentID, course);
        console.log(data);
      }


      const status = 200;
      if (status !== 200) {
        throw Error('Accept request failed for  course approval request ');
      }

      yield put({
        type: ADD_COURSE_TO_DEPARTMENT_SUCCESS,
        payload: {},
      });

      yield put({
          type: GET_DEPARTMENTS_REQUEST,
          payload: {},
      });
  } catch (error) {
    yield put({
      type: ADD_COURSE_TO_DEPARTMENT_FAIL,
      payload: error.message,
    });
  }
}

function* getUniversitiesFunc() {
  console.log(`Get unis `);

  try {
      // TODO: send Post request here
      const { data: exchange } = yield call(getExchangeUniversities);
      const { data: erasmus } = yield call(getErasmusUniversities);

      const status = 200;
      if (status !== 200) {
        throw Error('Accept request failed for  course approval request ');
      }

      yield put({
          type: GET_UNIVERSITIES_SUCCESS,
          payload: { erasmus: erasmus, exchange: exchange },
      });
  } catch (error) {
    yield put({
      type: GET_UNIVERSITIES_FAIL,
      payload: error.message,
    });
  }
}

const universitySaga = [
  takeEvery(CREATE_APPLICATIONS_FROM_EXCEL_REQUEST, createApplicationsFromExcel),
  takeEvery(GET_COURSES_BY_DEPARTMENT_REQUEST, getCoursesByDepartment),
  takeEvery(GET_DEPARTMENTS_REQUEST, getDepartmentsFunc),
  takeEvery(ADD_HOST_DEPARTMENT_REQUEST, addHostDepartmentFunc),
  takeEvery(ADD_COURSE_TO_DEPARTMENT_REQUEST, addCourseToDepartmentRequest),
  takeEvery(GET_UNIVERSITIES_REQUEST, getUniversitiesFunc),
];

export default universitySaga;
