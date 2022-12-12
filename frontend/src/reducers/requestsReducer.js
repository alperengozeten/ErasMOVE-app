import { GET_COURSE_APPROVAL_REQUESTS_SUCCESS, GET_PREAPPROVAL_FORMS_SUCCESS } from "../constants/actionTypes";

const INITIAL_STATE = {
    courseRequests: [], 
    acceptanceLetterRequests: [
      {
          id: 1,
          name: "John Doe",
          request: "Acceptance Letter",
          status: "waiting",
          department: "Computer Science",
          documents: [],
      },{
          id: 2,
          name: "Kürşad Güzelkaya",
          request: "Acceptance Letter",
          status: "waiting",
          department: "Electrical Engineering",
          documents: [],
      },{
          id: 3,
          name: "Jake Paul",
          request: "Acceptance Letter",
          status: "waiting",
          department: "Computer Science",
          documents: [],
      },{
          id: 4,
          name: "Lionel Messi",
          request: "Acceptance Letter",
          status: "waiting",
          department: "Computer Science",
          documents: [],
      },{
          id: 5,
          name: "Cristiano Ronaldo",
          request: "Acceptance Letter",
          status: "sent",
          department: "Computer Science",
          documents: [],
      },
    ], 
    preApprovalForms: [],
};

const requestsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
        case GET_PREAPPROVAL_FORMS_SUCCESS:
            return { ...state, preApprovalForms: action.payload };
        case GET_COURSE_APPROVAL_REQUESTS_SUCCESS:
            return { ...state, courseRequests: action.payload };

    }
  };
  
  export default requestsReducer;