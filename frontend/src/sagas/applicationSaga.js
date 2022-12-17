import { takeEvery, put, call } from 'redux-saga/effects';
import { GET_APPLICATIONS_BY_DEPARTMENT_FAIL, GET_APPLICATIONS_BY_DEPARTMENT_REQUEST, GET_APPLICATIONS_BY_DEPARTMENT_SUCCESS } from '../constants/actionTypes';
import { getApplicationsByDepartment } from '../lib/api/unsplashService';

function* getApplicationsByDepartmentReq({ payload: { user, typeForReq } }) {
    yield console.log(`Get applications... `);

    try {

        let applications = [];
        
        if (typeForReq === 'administrativeStaff') {

            for (var i = 0; i < user.departments.length; i++) {
                const { data } = yield call(getApplicationsByDepartment, user.departments[i].id);
                applications = [...applications, ...data];
            }
        } else {
            const { data } = yield call(getApplicationsByDepartment, user.department.id);
            applications = data;
        }
        console.log(applications);
  
        const status = 200;
        if (status !== 200) {
          throw Error('Accept request failed for  course approval request ');
        }
  
        yield put({
            type: GET_APPLICATIONS_BY_DEPARTMENT_SUCCESS,
            payload: applications,
        });
    } catch (error) {
      yield put({
        type: GET_APPLICATIONS_BY_DEPARTMENT_FAIL,
        payload: error.message,
      });
    }
}


const applicationSaga = [
    takeEvery(GET_APPLICATIONS_BY_DEPARTMENT_REQUEST, getApplicationsByDepartmentReq),
];

export default applicationSaga;
