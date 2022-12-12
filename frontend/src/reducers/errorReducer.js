import { CHANGE_PASSWORD_FAIL, CLEAR_ERRORS, GET_PREAPPROVAL_FORMS_FAIL, LOG_IN_FAIL, SEND_CODE_FAIL } from '../constants/actionTypes';

const INITIAL_STATE = {
  errors: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PREAPPROVAL_FORMS_FAIL:
    case SEND_CODE_FAIL:
    case CHANGE_PASSWORD_FAIL:
    case LOG_IN_FAIL: {
      console.log(action.payload);
      return { errors: [...state.errors, action.payload] };
    }
    case CLEAR_ERRORS: {
      return { errors: [] };
    }
    default:
      return state;
  }
};
