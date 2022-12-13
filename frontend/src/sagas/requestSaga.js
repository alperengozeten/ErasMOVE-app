import { takeEvery, put } from 'redux-saga/effects';

import { ACCEPT_COURSE_APPROVAL_REQUEST_FAIL, ACCEPT_COURSE_APPROVAL_REQUEST_REQUEST, ACCEPT_COURSE_APPROVAL_REQUEST_SUCCESS, ACCEPT_PREAPPROVAL_FORM_FAIL, ACCEPT_PREAPPROVAL_FORM_REQUEST, ACCEPT_PREAPPROVAL_FORM_SUCCESS, CREATE_COURSE_APPROVAL_REQUEST_FAIL, CREATE_COURSE_APPROVAL_REQUEST_REQUEST, CREATE_COURSE_APPROVAL_REQUEST_SUCCESS, CREATE_PREAPPROVAL_FORM_FAIL, CREATE_PREAPPROVAL_FORM_REQUEST, CREATE_PREAPPROVAL_FORM_SUCCES, DECLINE_COURSE_APPROVAL_REQUEST_FAIL, DECLINE_COURSE_APPROVAL_REQUEST_REQUEST, DECLINE_COURSE_APPROVAL_REQUEST_SUCCESS, DECLINE_PREAPPROVAL_FORM_FAIL, DECLINE_PREAPPROVAL_FORM_REQUEST, DECLINE_PREAPPROVAL_FORM_SUCCESS, DELETE_COURSE_APPROVAL_REQUEST_FAIL, DELETE_COURSE_APPROVAL_REQUEST_REQUEST, DELETE_COURSE_APPROVAL_REQUEST_SUCCESS, DELETE_PREAPPROVAL_FORM_FAIL, DELETE_PREAPPROVAL_FORM_REQUEST, DELETE_PREAPPROVAL_FORM_SUCCESS, GET_COURSE_APPROVAL_REQUESTS_FAIL, GET_COURSE_APPROVAL_REQUESTS_REQUEST, GET_COURSE_APPROVAL_REQUESTS_SUCCESS, GET_PREAPPROVAL_FORMS_FAIL, GET_PREAPPROVAL_FORMS_REQUEST, GET_PREAPPROVAL_FORMS_SUCCESS, SEND_REPLACEMENT_OFFER_REQUEST } from '../constants/actionTypes';


function sendReplacementOffer({ payload: { id } }) {
  console.log(`Replacement offerd to student with id ${id}`);
}

function* getPreApprovalFormsRequest({ payload: { id } }) {
  console.log(`PreApprovals requested with id ${id}`);

  try {

    //TODO: Send API request here
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

    //TODO: Send API request here
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
  
      //TODO: Send API request here
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

function* deleteCourseApprovalRequestRequest({ payload: { id, type } }) {
    console.log(`Course Approvals deleted with id ${id}`);
  
    try {

        if(type == "Elective") {
            //TODO: Send DELETE API request here
        } else {
            //TODO: Send DELETE API request here

        }
  
        const status = 200;
        if (status !== 200) {
            throw Error('Delete request failed for course approval request');
        }
  
      yield put({
        type: DELETE_COURSE_APPROVAL_REQUEST_SUCCESS,
        payload: id,
      });
    } catch (error) {
      yield put({
        type: DELETE_COURSE_APPROVAL_REQUEST_FAIL,
        payload: error.message,
      });
    }
}

function* acceptPreApprovalFormRequest({ payload: { id, feedback } }) {
    console.log(`PreApproval form accepted with id ${id} with msg: ${feedback}`);
  
    try {
        //TODO: Send POST API request here
  
        const status = 200;
        if (status !== 200) {
            throw Error('Accept request failed for  preApproval form ');
        }
  
        yield put({
            type: ACCEPT_PREAPPROVAL_FORM_SUCCESS,
            payload: id,
        });
    } catch (error) {
      yield put({
        type: ACCEPT_PREAPPROVAL_FORM_FAIL,
        payload: error.message,
      });
    }
}

function* declinePreApprovalFormRequest({ payload: { id, feedback } }) {
    console.log(`PreApproval form declined with id ${id} with msg: ${feedback}`);
  
    try {
        //TODO: Send POST API request here
  
        const status = 200;
        if (status !== 200) {
            throw Error('Accept request failed for  preApproval form ');
        }
  
        yield put({
            type: DECLINE_PREAPPROVAL_FORM_SUCCESS,
            payload: id,
        });
    } catch (error) {
      yield put({
        type: DECLINE_PREAPPROVAL_FORM_FAIL,
        payload: error.message,
      });
    }
}

function* acceptCourseApprovalRequestRequest({ payload: { id, type, feedback } }) {
    console.log(`PreApproval form accepted with id ${id} with msg: ${feedback}`);
  
    try {

        if(type == "Elective") {
            //TODO: Send POST API request here
        } else {
            //TODO: Send POST API request here
        }
        
  
        const status = 200;
        if (status !== 200) {
            throw Error('Accept request failed for  course approval request ');
        }
  
        yield put({
            type: ACCEPT_COURSE_APPROVAL_REQUEST_SUCCESS,
            payload: id,
        });
    } catch (error) {
      yield put({
        type: ACCEPT_COURSE_APPROVAL_REQUEST_FAIL,
        payload: error.message,
      });
    }
}

function* declineCourseApprovalRequestRequest({ payload: { id, type, feedback } }) {
    console.log(`Course approval request declined with id ${id} with msg: ${feedback}`);
  
    try {
        if(type == "Elective") {
            // TODO: Send POST API request here
        } else {
            //TODO: Send POST API request here
        }
  
        const status = 200;
        if (status !== 200) {
            throw Error('Accept request failed for  course approval request ');
        }
  
        yield put({
            type: DECLINE_COURSE_APPROVAL_REQUEST_SUCCESS,
            payload: id,
        });
    } catch (error) {
      yield put({
        type: DECLINE_COURSE_APPROVAL_REQUEST_FAIL,
        payload: error.message,
      });
    }
}

function* createCourseApprovalRequestRequest({ payload: { courseRequest, type } }) {
  console.log(`Course approval request created `);

  try {
      if(type == "Elective") {
          // TODO: Send POST API request here
      } else {
          //TODO: Send POST API request here
      }

      const status = 200;
      if (status !== 200) {
        throw Error('Accept request failed for  course approval request ');
      }

      yield put({
          type: CREATE_COURSE_APPROVAL_REQUEST_SUCCESS,
          payload: courseRequest,
      });
  } catch (error) {
    yield put({
      type: CREATE_COURSE_APPROVAL_REQUEST_FAIL,
      payload: error.message,
    });
  }
}

function* createPreApprovalFormRequest({ payload: { preApprovalForm } }) {
  console.log(`Pre approval form created `);

  try {
      // TODO: send Post request here

      const status = 200;
      if (status !== 200) {
        throw Error('Accept request failed for  course approval request ');
      }

      yield put({
          type: CREATE_PREAPPROVAL_FORM_SUCCES,
          payload: preApprovalForm,
      });
  } catch (error) {
    yield put({
      type: CREATE_PREAPPROVAL_FORM_FAIL,
      payload: error.message,
    });
  }
}


const requestSaga = [
  takeEvery(SEND_REPLACEMENT_OFFER_REQUEST, sendReplacementOffer),
  takeEvery(GET_PREAPPROVAL_FORMS_REQUEST, getPreApprovalFormsRequest),
  takeEvery(GET_COURSE_APPROVAL_REQUESTS_REQUEST, getCourseApprovalRequestsRequest),
  takeEvery(DELETE_PREAPPROVAL_FORM_REQUEST, deletePreApprovalFormRequest),
  takeEvery(DELETE_COURSE_APPROVAL_REQUEST_REQUEST, deleteCourseApprovalRequestRequest),
  takeEvery(ACCEPT_PREAPPROVAL_FORM_REQUEST, acceptPreApprovalFormRequest),
  takeEvery(DECLINE_PREAPPROVAL_FORM_REQUEST, declinePreApprovalFormRequest),
  takeEvery(ACCEPT_COURSE_APPROVAL_REQUEST_REQUEST, acceptCourseApprovalRequestRequest),
  takeEvery(DECLINE_COURSE_APPROVAL_REQUEST_REQUEST, declineCourseApprovalRequestRequest),
  takeEvery(CREATE_COURSE_APPROVAL_REQUEST_REQUEST, createCourseApprovalRequestRequest),
  takeEvery(CREATE_PREAPPROVAL_FORM_REQUEST, createPreApprovalFormRequest),
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
