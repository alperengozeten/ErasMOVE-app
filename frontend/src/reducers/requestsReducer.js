import { DELETE_COURSE_APPROVAL_REQUEST_SUCCESS, DELETE_FILE_REQUEST_SUCCESS, DELETE_PREAPPROVAL_FORM_SUCCESS, GET_COURSE_APPROVAL_REQUESTS_SUCCESS, GET_FILE_REQUESTS_SUCCESS, GET_PREAPPROVAL_FORMS_SUCCESS } from "../constants/actionTypes";

const INITIAL_STATE = {
    courseRequests: [], 
    fileRequests: [], 
    preApprovalForms: [],
    replacementOffers: [{
        from: "Eray Tüzün",
        student: "Alperen Gözeten",
        university: "Bilkent University",
        status: "Waiting for your response...",
        info: "You have a replacement offer for the Exchange Program.",
      },
    ],
};

const requestsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
        case GET_PREAPPROVAL_FORMS_SUCCESS:
            return { ...state, preApprovalForms: action.payload };
        case GET_COURSE_APPROVAL_REQUESTS_SUCCESS:
            return { ...state, courseRequests: action.payload };
        case GET_FILE_REQUESTS_SUCCESS:
            return { ...state, fileRequests: action.payload };
        case DELETE_PREAPPROVAL_FORM_SUCCESS:
            return { ...state, preApprovalForms: state.preApprovalForms.filter(preApprovalForm => preApprovalForm.id !== action.payload) };
        case DELETE_COURSE_APPROVAL_REQUEST_SUCCESS:
            return { ...state, courseRequests: state.courseRequests.filter(courseRequest => courseRequest.id !== action.payload) };
        case DELETE_FILE_REQUEST_SUCCESS:
            return { ...state, fileRequests: state.fileRequests.filter(fileRequest => fileRequest.id !== action.payload) };
    }
  };
  
  export default requestsReducer;