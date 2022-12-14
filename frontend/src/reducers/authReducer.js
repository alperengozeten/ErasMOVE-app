import { CHOOSE_AUTH_TYPE, LOG_IN_SUCCESS, LOG_OUT_SUCCESS } from '../constants/actionTypes';

const INITIAL_STATE = {
  authType: localStorage.getItem('authType'),
  authTypeForReq: localStorage.getItem('authTypeForReq'),
  status: localStorage.getItem('userId') ? 'authenticated' : 'not-authenticated',
  key: localStorage.getItem('key'),
  userId: localStorage.getItem('userId'),
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOG_IN_SUCCESS: {
      localStorage.setItem('userId', action.payload);
      return { ...state, status: 'authenticated', userId: action.payload };
    }
    case LOG_OUT_SUCCESS: {
      localStorage.removeItem('key');
      localStorage.removeItem('userId');
      return { ...state, status: 'not-authenticated', key: null, userId: null };
    }
    case CHOOSE_AUTH_TYPE: {
      localStorage.setItem('authType', action.authType);

      let typeForReq = '';
      if (action.authType === "Outgoing Student")
        typeForReq = 'outgoingStudent';
      else if (action.authType === "Incoming Student")
        typeForReq = 'incomingStudent';
      else if (action.authType === "Course Coordinator")
        typeForReq = 'courseCoordinator';
      else if (action.authType === "Department Coordinator")
        typeForReq = 'departmentCoordinator';
      else if (action.authType === "Administrative Staff")
        typeForReq = 'administrativeStaff';
      else if (action.authType === "Admin")
        typeForReq = 'admin';
      
      localStorage.setItem('authTypeForReq', typeForReq);
      return { ...state, authTypeForReq: typeForReq };
    }
    default:
      return state;
  }
};

export default loginReducer;