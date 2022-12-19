import { GET_LANGUAGE_BY_STUDENTID_SUCCESS } from "../constants/actionTypes";

const INITIAL_STATE = {
  language: {}
};

const languageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LANGUAGE_BY_STUDENTID_SUCCESS:
        return {
          ...state,
          language: action.payload,
        };
    default:
        return state;
  }
};

export default languageReducer;
