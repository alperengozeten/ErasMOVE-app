import { takeEvery, put } from 'redux-saga/effects';


import { GET_PREAPPROVAL_FORMS_FAIL, GET_PREAPPROVAL_FORMS_REQUEST, GET_PREAPPROVAL_FORMS_SUCCESS, SEND_REPLACEMENT_OFFER_REQUEST } from '../constants/actionTypes';


function sendReplacementOffer({ payload: { id } }) {
  console.log(`Replacement offerd to student with id ${id}`);
}

function* getPreApprovalFormsRequest({ payload: { id } }) {
  console.log(`Replacement offerd to student with id ${id}`);

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

const requestSaga = [
  takeEvery(SEND_REPLACEMENT_OFFER_REQUEST, sendReplacementOffer),
  takeEvery(GET_PREAPPROVAL_FORMS_REQUEST, getPreApprovalFormsRequest),
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

export default requestSaga;
