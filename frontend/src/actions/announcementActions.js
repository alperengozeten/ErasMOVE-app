import { CREATE_ANNOUNCEMENT_REQUEST, DELETE_ANNOUNCEMENT_REQUEST, GET_ANNOUNCEMENTS_REQUEST } from "../constants/actionTypes";

export const getAnnouncementRequest = (user, reqForType) => ({
    type: GET_ANNOUNCEMENTS_REQUEST,
    payload: { user, reqForType },
  });

export const createAnnouncementRequest = (announcement, departmentId) => ({
    type: CREATE_ANNOUNCEMENT_REQUEST,
    payload: { announcement, departmentId },
  });

export const deleteAnnouncementRequest = id => ({
    type: DELETE_ANNOUNCEMENT_REQUEST,
    payload: { id },
  });