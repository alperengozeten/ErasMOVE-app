import { ACCEPT_PREAPPROVAL_FORM_REQUEST, DECLINE_PREAPPROVAL_FORM_REQUEST, DELETE_COURSE_APPROVAL_REQUEST_REQUEST, DELETE_PREAPPROVAL_FORM_REQUEST, GET_COURSE_APPROVAL_REQUESTS_REQUEST, GET_PREAPPROVAL_FORMS_REQUEST, SEND_REPLACEMENT_OFFER_REQUEST } from "../constants/actionTypes";

export const sendReplacementOffer = id => 
    ({
        type: SEND_REPLACEMENT_OFFER_REQUEST,
        payload: { id },
    });

export const getPreApprovalFormsRequest = id => 
    ({
        type: GET_PREAPPROVAL_FORMS_REQUEST,
        payload: { id },
    });    

export const getCourseApprovalRequestsRequest = id => 
    ({
        type: GET_COURSE_APPROVAL_REQUESTS_REQUEST,
        payload: { id },
    });  

export const deletePreApprovalFormRequest = id => ({
        type: DELETE_PREAPPROVAL_FORM_REQUEST,
        payload: { id },
    }); 

export const deleteCourseApprovalRequestRequest = (id, type) => ({
        type: DELETE_COURSE_APPROVAL_REQUEST_REQUEST,
        payload: { id, type },
    }); 

export const acceptPreApprovalFormRequest = (id, feedback) => ({
        type: ACCEPT_PREAPPROVAL_FORM_REQUEST,
        payload: { id, feedback },
    });

export const declinePreApprovalFormRequest = (id, feedback) => ({
        type: DECLINE_PREAPPROVAL_FORM_REQUEST,
        payload: { id, feedback },
    });