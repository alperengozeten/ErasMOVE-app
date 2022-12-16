import { GET_APPLICATIONS_BY_DEPARTMENT_SUCCESS } from "../constants/actionTypes";

const INITIAL_STATE = {
  applications: [],
  // To just represent for now
  placedApplications: [],
  waitingApplications: [],
};

const applicationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_APPLICATIONS_BY_DEPARTMENT_SUCCESS:
        return {
          ...state,
          applications: action.payload,
          placedApplications: action.payload.filter(app => app.admittedStatus !== 'NOT ADMITTED'),
          waitingApplications: action.payload.filter(app => app.admittedStatus === 'NOT ADMITTED'),
        };
    default:
        return state;
  }
};

export default applicationReducer;
