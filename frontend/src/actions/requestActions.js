import { ACCEPT_COURSE_APPROVAL_REQUEST_REQUEST, ACCEPT_PREAPPROVAL_FORM_REQUEST, CREATE_COURSE_APPROVAL_REQUEST_REQUEST, CREATE_FILE_REQUEST_REQUEST, CREATE_PREAPPROVAL_FORM_REQUEST, DECLINE_COURSE_APPROVAL_REQUEST_REQUEST, DECLINE_PREAPPROVAL_FORM_REQUEST, DELETE_COURSE_APPROVAL_REQUEST_REQUEST, DELETE_FILE_REQUEST_REQUEST, DELETE_PREAPPROVAL_FORM_REQUEST, GET_COURSE_APPROVAL_REQUESTS_REQUEST, GET_FILE_REQUESTS_REQUEST, GET_PREAPPROVAL_FORMS_REQUEST, RESPOND_FILE_REQUEST_REQUEST, SEND_REPLACEMENT_OFFER_REQUEST } from "../constants/actionTypes";

export const sendReplacementOffer = id => 
    ({
        type: SEND_REPLACEMENT_OFFER_REQUEST,
        payload: { id },
    });

export const getPreApprovalFormsRequest = (id, typeForReq) => 
    ({
        type: GET_PREAPPROVAL_FORMS_REQUEST,
        payload: { id, typeForReq },
    });    

export const getCourseApprovalRequestsRequest = (id, typeForReq) => 
    ({
        type: GET_COURSE_APPROVAL_REQUESTS_REQUEST,
        payload: { id, typeForReq },
    });  

export const getFileRequestsRequest = (id, typeForReq) => 
    ({
        type: GET_FILE_REQUESTS_REQUEST,
        payload: { id, typeForReq },
    });  

export const deletePreApprovalFormRequest = id => ({
        type: DELETE_PREAPPROVAL_FORM_REQUEST,
        payload: { id },
    }); 

export const deleteCourseApprovalRequestRequest = (id, type) => ({
        type: DELETE_COURSE_APPROVAL_REQUEST_REQUEST,
        payload: { id, type },
    }); 

export const deleteFileRequestRequest = id => ({
        type: DELETE_FILE_REQUEST_REQUEST,
        payload: { id },
    });

export const acceptPreApprovalFormRequest = (id, feedback, userId) => ({
        type: ACCEPT_PREAPPROVAL_FORM_REQUEST,
        payload: { id, feedback, userId },
    });

export const declinePreApprovalFormRequest = (id, feedback, userId) => ({
        type: DECLINE_PREAPPROVAL_FORM_REQUEST,
        payload: { id, feedback, userId },
    });

export const acceptCourseApprovalRequestRequest = (id, type, feedback, userId) => ({
        type: ACCEPT_COURSE_APPROVAL_REQUEST_REQUEST,
        payload: { id, type, feedback, userId },
    });

export const declineCourseApprovalRequestRequest = (id, type, feedback, userId) => ({
        type: DECLINE_COURSE_APPROVAL_REQUEST_REQUEST,
        payload: { id, type, feedback, userId },
    });

export const createCourseApprovalRequestRequest = (courseRequest, type, file) => ({
        type: CREATE_COURSE_APPROVAL_REQUEST_REQUEST,
        payload: { courseRequest, type, file },
    });

export const createPreApprovalFormRequest = (preApprovalForm, userId) => ({
        type: CREATE_PREAPPROVAL_FORM_REQUEST,
        payload: { preApprovalForm, userId },
    });

export const createFileRequestRequest = (info, userId) => ({
        type: CREATE_FILE_REQUEST_REQUEST,
        payload: { info, userId },
    });

export const respondFileRequestRequest = (id, file, userId) => ({
        type: RESPOND_FILE_REQUEST_REQUEST,
        payload: { id, file, userId },
    });