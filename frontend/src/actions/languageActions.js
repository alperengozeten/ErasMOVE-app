import { GET_LANGUAGE_BY_STUDENTID_REQUEST, ADD_LANGUAGE_BY_STUDENTID_REQUEST } from "../constants/actionTypes";


export const getLanguageByStudentId = id => ({
  type: GET_LANGUAGE_BY_STUDENTID_REQUEST,
  payload: { id },
});

export const addLanguageByStudentId = (languages, id) => ({
    type: ADD_LANGUAGE_BY_STUDENTID_REQUEST,
    payload: { languages, id },
});