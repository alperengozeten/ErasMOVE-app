import { GET_NOTIFICATIONS_SUCCESS } from "../constants/actionTypes";

const INITIAL_STATE = {
    notifications: [
      {
        id: 1,
        date: "12.12.2022",
        read: true,
        content: "Final exams are announced."
      },
      {
        id: 2,
        date: "13.06.2022",
        read: false,
        content: "Final exams are announced. Final exams are announced. Final exams are announced."
      },
      {
        id: 3,
        date: "18.02.2022",
        read: false,
        content: "Final exams are announced. Final exams are announced."
      },
      {
        id: 4,
        date: "27.12.2022",
        read: true,
        content: "Final exams are announced. Final exams are announced."
      }
    ],
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
  