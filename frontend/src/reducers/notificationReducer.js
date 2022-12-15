import { GET_NOTIFICATIONS_SUCCESS } from "../constants/actionTypes";

const INITIAL_STATE = {
    notifications: [],
  };
  
  const notificationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_NOTIFICATIONS_SUCCESS:
        return { ...state, notifications: action.payload };
      default:
        return state;
    }
  };
  
  export default notificationReducer;
  