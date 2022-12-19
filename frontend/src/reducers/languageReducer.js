import { GET_LANGUAGE_BY_STUDENTID_SUCCESS, ADD_LANGUAGE_BY_STUDENTID_SUCCESS } from "../constants/actionTypes";

const INITIAL_STATE = {
  languages: []
};

const languageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LANGUAGE_BY_STUDENTID_SUCCESS:
        return {
          ...state,
          languages: action.payload,
        };
    // case ADD_LANGUAGE_BY_STUDENTID_SUCCESS:
    //     return {
    //       ...state,
    //       languages: action.payload,
    //     };    
    default:
        return state;
  }
};

export default languageReducer;
