import { takeEvery, put } from 'redux-saga/effects';

import { DELETE_PREAPPROVAL_FORM_FAIL, DELETE_PREAPPROVAL_FORM_REQUEST, DELETE_PREAPPROVAL_FORM_SUCCESS, GET_COURSE_APPROVAL_REQUESTS_FAIL, GET_COURSE_APPROVAL_REQUESTS_REQUEST, GET_COURSE_APPROVAL_REQUESTS_SUCCESS, GET_PREAPPROVAL_FORMS_FAIL, GET_PREAPPROVAL_FORMS_REQUEST, GET_PREAPPROVAL_FORMS_SUCCESS, SEND_REPLACEMENT_OFFER_REQUEST } from '../constants/actionTypes';


function sendReplacementOffer({ payload: { id } }) {
  console.log(`Replacement offerd to student with id ${id}`);
}

function* getPreApprovalFormsRequest({ payload: { id } }) {
  console.log(`PreApprovals requested with id ${id}`);

  try {

    // Send API request here
    const status = 200;
    const preApprovalForms = dummyForms;
    if (status !== 200) {
      throw Error('Request failed for preApproval forms');
    }

    yield put({
      type: GET_PREAPPROVAL_FORMS_SUCCESS,
      payload: preApprovalForms,
    });
  } catch (error) {
    yield put({
      type: GET_PREAPPROVAL_FORMS_FAIL,
      payload: error.message,
    });
  }
}

function* getCourseApprovalRequestsRequest({ payload: { id } }) {
  console.log(`Course Approvals requested with id ${id}`);

  try {

    // Send API request here
    const status = 200;
    const courseApprovalRequests = dummyCourseApprovals;
    if (status !== 200) {
      throw Error('Request failed for preApproval forms');
    }

    yield put({
      type: GET_COURSE_APPROVAL_REQUESTS_SUCCESS,
      payload: courseApprovalRequests,
    });
  } catch (error) {
    yield put({
      type: GET_COURSE_APPROVAL_REQUESTS_FAIL,
      payload: error.message,
    });
  }
}

function* deletePreApprovalFormRequest({ payload: { id } }) {
    console.log(`Course Approvals deleted with id ${id}`);
  
    try {
  
      // Send API request here
      const status = 200;
      if (status !== 200) {
        throw Error('Request failed for preApproval forms');
      }
  
      yield put({
        type: DELETE_PREAPPROVAL_FORM_SUCCESS,
        payload: id,
      });
    } catch (error) {
      yield put({
        type: DELETE_PREAPPROVAL_FORM_FAIL,
        payload: error.message,
      });
    }
  }

const requestSaga = [
  takeEvery(SEND_REPLACEMENT_OFFER_REQUEST, sendReplacementOffer),
  takeEvery(GET_PREAPPROVAL_FORMS_REQUEST, getPreApprovalFormsRequest),
  takeEvery(GET_COURSE_APPROVAL_REQUESTS_REQUEST, getCourseApprovalRequestsRequest),
  takeEvery(DELETE_PREAPPROVAL_FORM_REQUEST, deletePreApprovalFormRequest),
];

const dummyForms = [
  {
      id: 1,
      name: 'Kürşad Güzelkaya',
      status: "rejected",
      departmentCoordinator: "Altay Güvenir",
      mobilityCourses: [
          {
              courses: [
                  {
                      courseName: 'CS219',
                      description: 'Proggraming Life',
                      ECTS: 3,
                  },{
                      courseName: 'CS219',
                      description: 'Proggraming Life',
                      ECTS: 3,
                  }
              ],
              type: "Must",
              equivalentCourse: 'CS340',
          },
          {
              courses: [
                  {
                      courseName: 'CS219',
                      description: 'Proggraming Life',
                      ECTS: 3,
                  }
              ],
              type: "Must",
              equivalentCourse: 'CS340',
          }
      ],
      feedback: "Man this is terrible.. Are you serious??",
  },{
      id: 2,
      name: 'John Doe',
      status: "waiting",
      departmentCoordinator: "Aynur Dayanik",
      mobilityCourses: [
          {
              courses: [
                  {
                      courseName: 'CS219',
                      description: 'Proggraming Life',
                      ECTS: 3,
                  },{
                      courseName: 'CS219',
                      description: 'Proggraming Life',
                      ECTS: 3,
                  }
              ],
              type: "Must",
              equivalentCourse: 'CS340',
          }
      ],
      feedback: "Man this is terrible.. Are you serious??",
  },{
      id: 3,
      name: 'Namık Kemal',
      status: "accepted",
      departmentCoordinator: "Eray Hoca",
      mobilityCourses: [
          {
              courses: [
                  {
                      courseName: 'CS219',
                      description: 'Proggraming Life',
                      ECTS: 3,
                  },{
                      courseName: 'CS219',
                      description: 'Proggraming Life',
                      ECTS: 3,
                  }
              ],
              type: "Must",
              equivalentCourse: 'CS340',
          },
          {
              courses: [
                  {
                      courseName: 'CS219',
                      description: 'Proggraming Life',
                      ECTS: 3,
                  },{
                      courseName: 'CS219',
                      description: 'Proggraming Life',
                      ECTS: 3,
                  },{
                      courseName: 'CS219',
                      description: 'Proggraming Life',
                      ECTS: 3,
                  }
              ],
              type: "Must",
              equivalentCourse: 'CS340',
          },{
              courses: [
                  {
                      courseName: 'CS219',
                      description: 'Proggraming Life',
                      ECTS: 3,
                  }
              ],
              type: "Must",
              equivalentCourse: 'CS340',
          }
      ],
      feedback: "LGTM. You are perfect :))",
  },
];

const dummyCourseApprovals = [
  {
      id: 1,
      name: "John Doe",
      courseName: "CS315",
      equivalentCourse: "CS316",
      description: "Programming Languages",
      courseCoordinator: "Altay Güvenir",
      status: "waiting",
      type: "Must",
      documents: [],
      feedback: ""
  },{
      id: 2,
      name: "Kürşad Güzelkaya",
      courseName: "CS319",
      equivalentCourse: "CS316",
      description: "Objec Oriented SE",
      courseCoordinator: "Eray Hoca",
      status: "rejected",
      type: "Elective",
      documents: [],
      feedback: "Please fix the issues!!"
  },{
      id: 3,
      name: "Jake Paul",
      courseName: "CS115",
      equivalentCourse: "CS316",
      description: "Python",
      courseCoordinator: "Aynur Dayanık",
      status: "accepted",
      type: "Must",
      documents: [],
      feedback: "LGTM Thanks!"
  },{
      id: 4,
      name: "Lionel Messi",
      courseName: "MATH230",
      equivalentCourse: "CS316",
      description: "Programming Languages",
      courseCoordinator: "Altay Güvenir",
      status: "waiting",
      type: "Must",
      documents: [],
      feedback: ""
  },{
      id: 5,
      name: "Cristiano Ronaldo",
      courseName: "CS315",
      equivalentCourse: "CS316",
      description: "Programming Languages",
      courseCoordinator: "Altay Güvenir",
      status: "rejected",
      type: "Elective",
      documents: [],
      feedback: "This is terrible mann :/"
  },
];

export default requestSaga;
