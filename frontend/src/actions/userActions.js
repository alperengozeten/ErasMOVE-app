import { GET_APPLICATION_REQUEST, GET_USER_REQUEST } from "../constants/actionTypes";

export const getUserRequest = (id, typeForReq) => ({
    type: GET_USER_REQUEST,
    payload: { id, typeForReq },
});

export const getApplicationRequest = id => ({
    type: GET_APPLICATION_REQUEST,
    payload: { id },
});