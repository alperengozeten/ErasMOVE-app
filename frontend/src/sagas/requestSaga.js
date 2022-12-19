import { takeEvery, put, call } from 'redux-saga/effects';

import { ACCEPT_COURSE_APPROVAL_REQUEST_FAIL, ACCEPT_COURSE_APPROVAL_REQUEST_REQUEST, ACCEPT_COURSE_APPROVAL_REQUEST_SUCCESS,
  ACCEPT_PREAPPROVAL_FORM_FAIL, ACCEPT_PREAPPROVAL_FORM_REQUEST, ACCEPT_PREAPPROVAL_FORM_SUCCESS, ACCEPT_REPLACEMENT_OFFER_FAIL, ACCEPT_REPLACEMENT_OFFER_REQUEST, ACCEPT_REPLACEMENT_OFFER_SUCCESS, CREATE_COURSE_APPROVAL_REQUEST_FAIL,
  CREATE_COURSE_APPROVAL_REQUEST_REQUEST, CREATE_COURSE_APPROVAL_REQUEST_SUCCESS, CREATE_FILE_REQUEST_FAIL, CREATE_FILE_REQUEST_REQUEST, CREATE_FILE_REQUEST_SUCCESS, CREATE_PREAPPROVAL_FORM_FAIL,
  CREATE_PREAPPROVAL_FORM_REQUEST, CREATE_PREAPPROVAL_FORM_SUCCES, DECLINE_COURSE_APPROVAL_REQUEST_FAIL, DECLINE_COURSE_APPROVAL_REQUEST_REQUEST,
  DECLINE_COURSE_APPROVAL_REQUEST_SUCCESS, DECLINE_PREAPPROVAL_FORM_FAIL, DECLINE_PREAPPROVAL_FORM_REQUEST,
  DECLINE_PREAPPROVAL_FORM_SUCCESS, DECLINE_REPLACEMENT_OFFER_FAIL, DECLINE_REPLACEMENT_OFFER_REQUEST, DECLINE_REPLACEMENT_OFFER_SUCCESS, DELETE_COURSE_APPROVAL_REQUEST_FAIL, DELETE_COURSE_APPROVAL_REQUEST_REQUEST,
  DELETE_COURSE_APPROVAL_REQUEST_SUCCESS, DELETE_FILE_REQUEST_FAIL, DELETE_FILE_REQUEST_REQUEST, DELETE_FILE_REQUEST_SUCCESS, DELETE_PREAPPROVAL_FORM_FAIL, DELETE_PREAPPROVAL_FORM_REQUEST, DELETE_PREAPPROVAL_FORM_SUCCESS,
  DELETE_PROPOSED_REQUEST_REQUEST,
  GET_COURSE_APPROVAL_REQUESTS_FAIL, GET_COURSE_APPROVAL_REQUESTS_REQUEST, GET_COURSE_APPROVAL_REQUESTS_SUCCESS, GET_FILE_REQUESTS_FAIL, GET_FILE_REQUESTS_REQUEST, GET_FILE_REQUESTS_SUCCESS, GET_PREAPPROVAL_FORMS_FAIL,
  GET_PREAPPROVAL_FORMS_REQUEST, GET_PREAPPROVAL_FORMS_SUCCESS, GET_PROPOSED_REQUEST_FAIL, GET_PROPOSED_REQUEST_REQUEST, GET_PROPOSED_REQUEST_SUCCESS, GET_REPLACEMENT_OFFER_FAIL, GET_REPLACEMENT_OFFER_REQUEST, GET_REPLACEMENT_OFFER_SUCCESS, RESPOND_FILE_REQUEST_FAIL, RESPOND_FILE_REQUEST_REQUEST, RESPOND_FILE_REQUEST_SUCCESS, SEND_REPLACEMENT_OFFER_REQUEST } from '../constants/actionTypes';
import {
  acceptElectiveCourseApproval, acceptErasmusReplacementRequest, acceptExchangeReplacementRequest, acceptMandatoryCourseApproval, acceptPreApprvalForm,  addMobilityCoursesToPreApprovalForm,
  createElectiveCourseApproval,  createFileRequest,  createMandatoryCourseApproval, createPreApprovalForm, declineElectiveCourseApproval,
  declineErasmusReplacementRequest,
  declineExchangeReplacementRequest,
  declineMandatoryCourseApproval, declinePreApprovalForm, deleteElectiveCourseApproval, deleteErasmusReplacementRequest, deleteExchangeProposedReplacementRequest, deleteFileRequest,
  deleteMandatoryCourseApproval, deletePreApprovalForm, getElectiveCourseApprovalDocument, getElectiveCourseApprovals,
  getErasmusProposedReplacementRequest,
  getErasmusReplacementRequest,
  getExchangeProposedReplacementRequest,
  getExchangeReplacementRequest,
  getFileRequests, getMandatoryCourseApprovalDocument, getMandatoryCourseApprovals, getPreApprovalFormMobilityCourses, getPreApprovalForms,
  respondFileRequest,
  respondFileRequestSendFile,
  sendErasmusReplacementRequest,
  sendExchangeReplacementRequest,
  sendSyllabusElective, sendSyllabusMandatory
} from '../lib/api/unsplashService';


function* sendReplacementOffer({ payload: { replacementRequest, type } }) {
  console.log(`Replacement req`);

  try {

    if (type === 'Erasmus') {
      const { data } = yield call(sendErasmusReplacementRequest, replacementRequest);
    } else {
      const { data } = yield call(sendExchangeReplacementRequest, replacementRequest);
    }

    const status = 200;
    if (status !== 200) {
      throw Error('Request failed for preApproval forms');
    }

    yield put({
      type: GET_PREAPPROVAL_FORMS_SUCCESS,
      payload: {},
    });
  } catch (error) {
    yield put({
      type: GET_PREAPPROVAL_FORMS_FAIL,
      payload: error.message,
    });
  }
}


// PreApproval
function* getPreApprovalFormsRequest({ payload: { id, typeForReq } }) {
  console.log(`PreApprovals requested with id ${id}`);

  try {
    const { data: preApps } = yield call(getPreApprovalForms, id, typeForReq);

    for (let i = 0; i < preApps.length; i++) {
      const { data } = yield call(getPreApprovalFormMobilityCourses, preApps[i].id);
      preApps[i].mobilityCourses = data;
    }

    console.log('PreAppsWMC: ', preApps);

    const status = 200;
    if (status !== 200) {
      throw Error('Request failed for preApproval forms');
    }

    yield put({
      type: GET_PREAPPROVAL_FORMS_SUCCESS,
      payload: preApps,
    });
  } catch (error) {
    yield put({
      type: GET_PREAPPROVAL_FORMS_FAIL,
      payload: error.message,
    });
  }
}


function* deletePreApprovalFormRequest({ payload: { id } }) {
  console.log(`Course Approvals deleted with id ${id}`);

  try {

    const { data } = yield call(deletePreApprovalForm, id);
    console.log(data);
    
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

function* acceptPreApprovalFormRequest({ payload: { id, feedback, userId } }) {
  console.log(`PreApproval form accepted with id ${id} with msg: ${feedback}`);

  try {
      const { data } = yield call(acceptPreApprvalForm, id, feedback);
      console.log(data);

      const status = 200;
      if (status !== 200) {
          throw Error('Accept request failed for  preApproval form ');
      }

      yield put({
          type: ACCEPT_PREAPPROVAL_FORM_SUCCESS,
          payload: id,
      });

      yield put({
        type: GET_PREAPPROVAL_FORMS_REQUEST,
        payload: { id: userId, typeForReq: "departmentCoordinator" },
    });
  } catch (error) {
    yield put({
      type: ACCEPT_PREAPPROVAL_FORM_FAIL,
      payload: error.message,
    });
  }
}

function* declinePreApprovalFormRequest({ payload: { id, feedback, userId } }) {
  console.log(`PreApproval form declined with id ${id} with msg: ${feedback}`);

  try {
      const { data } = yield call(declinePreApprovalForm, id, feedback);
      console.log(data);

      const status = 200;
      if (status !== 200) {
          throw Error('Accept request failed for  preApproval form ');
      }

      yield put({
          type: DECLINE_PREAPPROVAL_FORM_SUCCESS,
          payload: id,
      });

      yield put({
        type: GET_PREAPPROVAL_FORMS_REQUEST,
        payload: { id: userId, typeForReq: "departmentCoordinator" },
    });
  } catch (error) {
    yield put({
      type: DECLINE_PREAPPROVAL_FORM_FAIL,
      payload: error.message,
    });
  }
}

function* createPreApprovalFormRequest({ payload: { preApprovalForm, userId } }) {
  console.log(`Pre approval form created `);

  try {
      // TODO: send Post request here
      const preApprovalFormReq = {
          info:"Pre-Approval Form Request",
          feedback:"",
          student: {
              id: userId,
          }, 
      };
      
      const response = yield call(createPreApprovalForm, preApprovalFormReq); 

      let requestId = 0;
      let msg = '';

      yield response.json().then(value => {
        requestId = value.id;
        msg = value.msg;
      });
      
      const mobilityCourses = [];
      for (let i = 0; i < preApprovalForm.mobilityCourses.length; i++) {
        const mg = []; 
        for (let j = 0; j < preApprovalForm.mobilityCourses[i].courses.length; j++) {
          mg[j] ={ id: preApprovalForm.mobilityCourses[i].courses[j] };
        }
        mobilityCourses[i] = {
          type: preApprovalForm.mobilityCourses[i].type,
          mergedCourses: mg,
          correspondingCourse: { id: preApprovalForm.mobilityCourses[i].equivalentCourse }
        };
      }

      const { data } = yield call(addMobilityCoursesToPreApprovalForm, requestId, mobilityCourses);
      console.log(data);

      const status = 200;
      if (status !== 200) {
        throw Error('Accept request failed for  course approval request ');
      }

      yield put({
          type: CREATE_PREAPPROVAL_FORM_SUCCES,
          payload: preApprovalForm,
      });

      yield put({
        type: GET_PREAPPROVAL_FORMS_REQUEST,
        payload: { id: userId, typeForReq: "outgoingStudent" },
      });
  } catch (error) {
    yield put({
      type: CREATE_PREAPPROVAL_FORM_FAIL,
      payload: error.message,
    });
  }
}

// Course Approvals
function* getCourseApprovalRequestsRequest({ payload: { id, typeForReq } }) {
  console.log(`Course Approvals requested with id ${id}`);

  try {

    let electiveCourseApprovals = [];
    let mandatoryCourseApprovals = [];

    if (typeForReq !== 'courseCoordinator') {
      const {data: elective} = yield call(getElectiveCourseApprovals, id, typeForReq);
      electiveCourseApprovals = elective;

      for (let i = 0; i < electiveCourseApprovals.length; i++) {
        const { data: syllabus } = yield call(getElectiveCourseApprovalDocument, electiveCourseApprovals[i].id);
        electiveCourseApprovals[i].syllabus = syllabus;
      }
    } 
    
    if (typeForReq !== 'departmentCoordinator') {
      const {data: mandatory} = yield call(getMandatoryCourseApprovals, id, typeForReq);
      mandatoryCourseApprovals = mandatory;
      for (let i = 0; i < mandatoryCourseApprovals.length; i++) {
        const { data: syllabus } = yield call(getMandatoryCourseApprovalDocument, mandatoryCourseApprovals[i].id);
        mandatoryCourseApprovals[i].syllabus = syllabus;
      }
    }

    const courseApprovals = [...electiveCourseApprovals, ...mandatoryCourseApprovals];

    const status = 200;
    if (status !== 200) {
      throw Error('Request failed for preApproval forms');
    }

    yield put({
      type: GET_COURSE_APPROVAL_REQUESTS_SUCCESS,
      payload: courseApprovals,
    });
  } catch (error) {
    yield put({
      type: GET_COURSE_APPROVAL_REQUESTS_FAIL,
      payload: error.message,
    });
  }
}


function* deleteCourseApprovalRequestRequest({ payload: { id, type } }) {
    console.log(`Course Approvals deleted with id ${id}`);
  
    try {

        if(type == "Elective") {
            //TODO: Send DELETE API request here
            const response = yield call(deleteElectiveCourseApproval, id);
            console.log(response);
        } else {
            //TODO: Send DELETE API request here
            const response = yield call(deleteMandatoryCourseApproval, id);
            console.log(response);
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



function* acceptCourseApprovalRequestRequest({ payload: { id, type, feedback, userId } }) {
    console.log(`PreApproval form accepted with id ${id} with msg: ${feedback}`);
  
    try {

        if(type == "Elective") {
            const { data } = yield call(acceptElectiveCourseApproval, id, feedback);
            console.log(data);
        } else {
            //TODO: Send POST API request here
            const { data } = yield call(acceptMandatoryCourseApproval, id, feedback);
            console.log(data);
        }
        
  
        const status = 200;
        if (status !== 200) {
            throw Error('Accept request failed for  course approval request ');
        }
  
        yield put({
            type: ACCEPT_COURSE_APPROVAL_REQUEST_SUCCESS,
            payload: id,
        });

        yield put({
          type: GET_COURSE_APPROVAL_REQUESTS_REQUEST,
          payload: { id: userId, typeForReq: (type === 'Elective' ? "departmentCoordinator" : "courseCoordinator")}
        });
    } catch (error) {
      yield put({
        type: ACCEPT_COURSE_APPROVAL_REQUEST_FAIL,
        payload: error.message,
      });
    }
}

function* declineCourseApprovalRequestRequest({ payload: { id, type, feedback, userId } }) {
    console.log(`Course approval request declined with id ${id} with msg: ${feedback}`);
  
    try {
        if(type == "Elective") {
            const { data } = yield call(declineElectiveCourseApproval, id, feedback);
            console.log(data);
        } else {
            const { data } = yield call(declineMandatoryCourseApproval, id, feedback);
            console.log(data);
        }
  
        const status = 200;
        if (status !== 200) {
            throw Error('Accept request failed for  course approval request ');
        }
  
        yield put({
            type: DECLINE_COURSE_APPROVAL_REQUEST_SUCCESS,
            payload: id,
        });

        yield put({
          type: GET_COURSE_APPROVAL_REQUESTS_REQUEST,
          payload: { id: userId, typeForReq: (type === 'Elective' ? "departmentCoordinator" : "courseCoordinator")}
        });
    } catch (error) {
      yield put({
        type: DECLINE_COURSE_APPROVAL_REQUEST_FAIL,
        payload: error.message,
      });
    }
}

function* createCourseApprovalRequestRequest({ payload: { courseRequest, type, file } }) {
  console.log(`Course approval request created `);

  try {
      if(type == "Elective") {
          const response = yield call(createElectiveCourseApproval, courseRequest);
          let requestId = 0;
          let msg = '';

          yield response.json().then(value => {
            requestId = value.id;
            msg = value.msg;
          });

          const formData = new FormData();
          formData.append('syllabus', file);
          console.log(file);
          console.log(formData);

          const res2 = yield call(sendSyllabusElective, requestId, formData);
          console.log('res2: ', res2);
          console.log(msg);
          
      } else {
          const response = yield call(createMandatoryCourseApproval, courseRequest);
          let requestId = 0;
          let msg = '';

          yield response.json().then(value => {
            requestId = value.id;
            msg = value.msg;
          });

          const formData = new FormData();
          formData.append('syllabus', file);

          const res2 = yield call(sendSyllabusMandatory, requestId, formData);
          console.log('res2: ', res2);
          console.log(msg);
      }

      const status = 200;
      if (status !== 200) {
        throw Error('Accept request failed for  course approval request ');
      }

      yield put({
          type: CREATE_COURSE_APPROVAL_REQUEST_SUCCESS,
          payload: courseRequest,
      });

      const studentId = courseRequest.student.id;

      yield put({
        type: GET_COURSE_APPROVAL_REQUESTS_REQUEST,
        payload: { id: studentId, typeForReq: "outgoingStudent" },
    });
  } catch (error) {
    yield put({
      type: CREATE_COURSE_APPROVAL_REQUEST_FAIL,
      payload: error.message,
    });
  }
}

function* getFileRequestsReq({ payload: { id, typeForReq } }) {
  console.log(`Course approval request created `);

  try {
      const { data } = yield call(getFileRequests, id, typeForReq);  
      console.log(data);

      const status = 200;
      if (status !== 200) {
        throw Error('Accept request failed for  course approval request ');
      }

      yield put({
          type: GET_FILE_REQUESTS_SUCCESS,
          payload: data,
      });
  } catch (error) {
    yield put({
      type: GET_FILE_REQUESTS_FAIL,
      payload: error.message,
    });
  }
}

function* deleteFileRequestReq({ payload: { id } }) {
  console.log(`delete file request `);

  try {
      const { data } = yield call(deleteFileRequest, id);  
      console.log(data);

      const status = 200;
      if (status !== 200) {
        throw Error('Accept request failed for  course approval request ');
      }

      yield put({
          type: DELETE_FILE_REQUEST_SUCCESS,
          payload: id,
      });
  } catch (error) {
    yield put({
      type: DELETE_FILE_REQUEST_FAIL,
      payload: error.message,
    });
  }
}

function* createFileRequestRequest({ payload: { info, userId } }) {
  console.log(`create file request `);

  try {
      const fileReq = {
        info: info,
        student: {
          id: userId
        }
      };

      const { data } = yield call(createFileRequest, fileReq);  
      console.log(data);

      const status = 200;
      if (status !== 200) {
        throw Error('Accept request failed for  course approval request ');
      }

      yield put({
          type: CREATE_FILE_REQUEST_SUCCESS,
          payload: userId,
      });

      yield put({
        type: GET_FILE_REQUESTS_REQUEST,
        payload: { id: userId, typeForReq: "outgoingStudent" }
    });
  } catch (error) {
    yield put({
      type: CREATE_FILE_REQUEST_FAIL,
      payload: error.message,
    });
  }
}

function* respondFileRequestRequest({ payload: { id, file, userId, type } }) {
  console.log(`create file request `);

  try {
      const formData = new FormData();
      formData.append('syllabus', file);

      console.log(file);
      console.log(formData);

      const response = yield call(respondFileRequest, id, file);  
      console.log(response);

      const res2 = yield call(sendSyllabusMandatory, id, formData);

      //const { dat } = yield call(respondFileRequestSendFile, id, file, type);  
      //console.log(dat);

      const status = 200;
      if (status !== 200) {
        throw Error('Accept request failed for  course approval request ');
      }

      yield put({
          type: RESPOND_FILE_REQUEST_SUCCESS,
          payload: userId,
      });

      yield put({
        type: GET_FILE_REQUESTS_REQUEST,
        payload: { id: userId, typeForReq: "administrativeStaff" }
    });
  } catch (error) {
    yield put({
      type: RESPOND_FILE_REQUEST_FAIL,
      payload: error.message,
    });
  }
}

function* getReplacementRequests({ payload: { id, typeForReq, isErasmus } }) {
  console.log(`create file request `);

  try {
      let response = '';
      if (isErasmus) {
         response = yield call(getErasmusReplacementRequest, id);  
      } else {
        response = yield call(getExchangeReplacementRequest, id);  
      }
      console.log(response);
      const offer = response.data.filter(form => form.status === "WAITING")[0];
      console.log(offer);

      const status = 200;
      if (status !== 200) {
        throw Error('Accept request failed for  course approval request ');
      }

      yield put({
          type: GET_REPLACEMENT_OFFER_SUCCESS,
          payload: offer,
      });
  } catch (error) {
    yield put({
      type: GET_REPLACEMENT_OFFER_FAIL,
      payload: error.message,
    });
  }
}

function* acceptReplacementRequest({ payload: { id, isErasmus } }) {
  console.log(`create file request `);

  try {
      let response = '';
      if (isErasmus) {
         response = yield call(acceptErasmusReplacementRequest, id);  
      } else {
        response = yield call(acceptExchangeReplacementRequest, id);  
      }
      console.log(response);

      const status = 200;
      if (status !== 200) {
        throw Error('Accept request failed for  course approval request ');
      }

      yield put({
          type: ACCEPT_REPLACEMENT_OFFER_SUCCESS,
          payload: {},
      });
  } catch (error) {
    yield put({
      type: ACCEPT_REPLACEMENT_OFFER_FAIL,
      payload: error.message,
    });
  }
}

function* declineReplacementRequest({ payload: { id, isErasmus } }) {
  console.log(`create file request `);

  try {
      let response = '';
      if (isErasmus) {
         response = yield call(declineErasmusReplacementRequest, id);  
      } else {
        response = yield call(declineExchangeReplacementRequest, id);  
      }
      console.log(response);

      const status = 200;
      if (status !== 200) {
        throw Error('Accept request failed for  course approval request ');
      }

      yield put({
          type: DECLINE_REPLACEMENT_OFFER_SUCCESS,
          payload: {},
      });
  } catch (error) {
    yield put({
      type: DECLINE_REPLACEMENT_OFFER_FAIL,
      payload: error.message,
    });
  }
}

function* getProposedRequestReq({ payload: { id } }) {
  console.log(`create file request `);

  try {
      
      const {data: erasmus} = yield call(getErasmusProposedReplacementRequest, id);  

      const {data: exchange} = yield call(getExchangeProposedReplacementRequest, id);  

      const proposed = [...erasmus,...exchange];
      console.log(proposed);

      const status = 200;
      if (status !== 200) {
        throw Error('Accept request failed for  course approval request ');
      }

      yield put({
          type: GET_PROPOSED_REQUEST_SUCCESS,
          payload: proposed,
      });
  } catch (error) {
    yield put({
      type: GET_PROPOSED_REQUEST_FAIL,
      payload: error.message,
    });
  }
}

function* deleteReplacementRequest({ payload: { id, type } }) {
  console.log(`create file request `);

  try {
      
      if(type === 'Erasmus'){
        const {data: erasmus} = yield call(deleteErasmusReplacementRequest, id);  
      } else {
        const {data: erasmus} = yield call(deleteExchangeProposedReplacementRequest, id);  
      }

      const status = 200;
      if (status !== 200) {
        throw Error('Accept request failed for  course approval request ');
      }

  } catch (error) {
      console.log(error);
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
  takeEvery(GET_FILE_REQUESTS_REQUEST, getFileRequestsReq),
  takeEvery(DELETE_FILE_REQUEST_REQUEST, deleteFileRequestReq),
  takeEvery(CREATE_FILE_REQUEST_REQUEST, createFileRequestRequest),
  takeEvery(RESPOND_FILE_REQUEST_REQUEST, respondFileRequestRequest),
  takeEvery(GET_REPLACEMENT_OFFER_REQUEST, getReplacementRequests),
  takeEvery(ACCEPT_REPLACEMENT_OFFER_REQUEST, acceptReplacementRequest),
  takeEvery(DECLINE_REPLACEMENT_OFFER_REQUEST, declineReplacementRequest),
  takeEvery(GET_PROPOSED_REQUEST_REQUEST, getProposedRequestReq),
  takeEvery(DELETE_PROPOSED_REQUEST_REQUEST, deleteReplacementRequest),
];

export default requestSaga;
