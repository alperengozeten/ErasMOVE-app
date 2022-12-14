import { GET_APPLICATION_SUCCESS, GET_USER_SUCCESS } from "../constants/actionTypes";


const INITIAL_STATE = {
  user: {
    id: 32,
    type: 'Outgoing Student',
    name: 'John Doe',
    email: 'john@bilkent.edu.tr',
    studentInfo: {
      studentID: '21902131',
      semesterNo: 7,
      departmentName: 'Computer Science',
    },
  },
  application: {}
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS: {
      return {...state, user: action.payload };
    }
    case GET_APPLICATION_SUCCESS: {
      return {...state, application: action.payload };
    }
    default:
      return state;
  }
};

export default userReducer;
