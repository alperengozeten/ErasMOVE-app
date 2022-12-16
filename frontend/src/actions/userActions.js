import { GET_APPLICATION_REQUEST, GET_NOTIFICATIONS_REQUEST, GET_USER_REQUEST, MARK_NOTIFICATION_READ_REQUEST } from "../constants/actionTypes";

export const getUserRequest = (id, typeForReq) => ({
    type: GET_USER_REQUEST,
    payload: { id, typeForReq },
});

export const getApplicationRequest = id => ({
    type: GET_APPLICATION_REQUEST,
    payload: { id },
});

export const getNotificationsRequest = id => ({
    type: GET_NOTIFICATIONS_REQUEST,
    payload: { id },
});

export const markNotificationReadRequest = id => ({
    type: MARK_NOTIFICATION_READ_REQUEST,
    payload: { id },
});