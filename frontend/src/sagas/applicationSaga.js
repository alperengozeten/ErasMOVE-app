import { takeEvery, put } from 'redux-saga/effects';
import { GET_APPLICATIONS_BY_DEPARTMENT_FAIL, GET_APPLICATIONS_BY_DEPARTMENT_REQUEST, GET_APPLICATIONS_BY_DEPARTMENT_SUCCESS } from '../constants/actionTypes';

function* getApplicationsByDepartment({ payload: { department, isErasmus } }) {
    yield console.log(`Get applications... ${department} and ${isErasmus} `);

    try {
        // TODO: send Post request here
        //const { data } = yield call(getApplication, id);
  
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
    takeEvery(GET_APPLICATIONS_BY_DEPARTMENT_REQUEST, getApplicationsByDepartment),
];

const applications = [
    {
        id: 1,
        name: "John Doe",
        type: 'Erasmus',
        department: "Computer Science",
        selectedUniversities: [],
        selectedSemester: 'fall',
        score: 67,
        status: "waiting",
        admittedUniversity: null,
        documents: [],
    },{
        id: 2,
        name: "Kürşad Güzelkaya",
        type: 'Erasmus',
        department: "Computer Science",
        selectedUniversities: [],
        selectedSemester: 'fall',
        score: 77,
        status: "waiting",
        admittedUniversity: null,
        documents: [],
    },{
        id: 3,
        name: "Jake Paul",
        type: 'Erasmus',
        department: "Computer Science",
        selectedUniversities: [],
        selectedSemester: 'fall',
        score: 80,
        status: "waiting",
        admittedUniversity: null,
        documents: [],
    },{
        id: 4,
        name: "Lionel Messi",
        type: 'Erasmus',
        department: "Computer Science",
        selectedUniversities: [],
        selectedSemester: 'fall',
        score: 69,
        status: "waiting",
        admittedUniversity: null,
        documents: [],
    },{
        id: 5,
        name: "Cristiano Ronaldo",
        type: 'Erasmus',
        department: "Mechanical Engineering",
        selectedUniversities: [],
        selectedSemester: 'fall',
        score: 85,
        status: "waiting",
        admittedUniversity: null,
        documents: [],
    },
];

export default applicationSaga;
