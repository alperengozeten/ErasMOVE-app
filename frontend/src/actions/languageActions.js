import { GET_LANGUAGE_BY_STUDENTID_REQUEST, ADD_LANGUAGE_BY_STUDENTID_REQUEST } from "../constants/actionTypes";


export const getLanguageByStudentId = id => ({
  type: GET_LANGUAGE_BY_STUDENTID_REQUEST,
  payload: { id },
});

export const addLanguageByStudentId = (langObj, user) => ({
    type: ADD_LANGUAGE_BY_STUDENTID_REQUEST,
    payload: { langObj, user },
});