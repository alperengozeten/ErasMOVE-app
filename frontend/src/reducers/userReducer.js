import { GET_APPLICATION_SUCCESS, GET_USER_SUCCESS } from "../constants/actionTypes";


const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem('user')),
  application: JSON.parse(localStorage.getItem('application')),
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS: {
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {...state, user: action.payload };
    }
    case GET_APPLICATION_SUCCESS: {
      localStorage.setItem('application', JSON.stringify(action.payload));
      return {...state, application: action.payload };
    }
    default:
      return state;
  }
};

export default userReducer;
