import { GET_COURSE_APPROVAL_REQUESTS_REQUEST, GET_PREAPPROVAL_FORMS_REQUEST, SEND_REPLACEMENT_OFFER_REQUEST } from "../constants/actionTypes";

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