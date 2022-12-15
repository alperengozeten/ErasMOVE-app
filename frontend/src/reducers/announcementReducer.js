import { GET_ANNOUNCEMENTS_SUCCESS } from "../constants/actionTypes";

const INITIAL_STATE = {
  announcements: [],
};

const announcementReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ANNOUNCEMENTS_SUCCESS:
      return {...state, announcements: action.payload };
    default:
      return state;
  }
};

export default announcementReducer;
