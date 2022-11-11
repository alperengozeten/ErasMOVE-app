import { LOG_IN_SUCCESS, LOG_OUT_SUCCESS } from '../constants/actionTypes';

const INITIAL_STATE = {
  status: localStorage.getItem('key') ? 'authenticated' : 'not-authenticated',
  key: localStorage.getItem('key'),
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOG_IN_SUCCESS: {
      localStorage.setItem('key', action.payload);
      return { ...state, status: 'authenticated', key: action.payload };
    }
    case LOG_OUT_SUCCESS: {
      localStorage.removeItem('key');
      return { ...state, status: 'not-authenticated', key: null };
    }
    default:
      return state;
  }
};

export default loginReducer;