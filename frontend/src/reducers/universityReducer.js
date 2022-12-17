import { GET_DEPARTMENTS_SUCCESS, GET_UNIVERSITIES_SUCCESS } from "../constants/actionTypes";
import { DELETE_UNIVERSITY_SUCCESS } from "../constants/actionTypes";


const INITIAL_STATE = {
    universities: [
      {
          id: 1,
          name: "Harvard University",
          type: "Erasmus",
          emptyQuota: 4,
          totalQuota: 8,
          departments:[" EEE "," IE "]

      },    {
        id: 2,
        name: "Stanford University",
        type: "Erasmus",
        emptyQuota: 4,
        totalQuota: 6,
        departments:[" CS "," ME "]

    },    {
        id: 3,
        name: "Bridgeton University",
        type: "Exchange",
        emptyQuota: 2,
        totalQuota: 5,
        departments:[" MBG "," IE "]

    },    {
        id: 4,
        name: "Cambridge University",
        type: "Erasmus",
        emptyQuota: 0,
        totalQuota: 3,
        departments:[" CS "," IE "]

    },    {
        id: 5,
        name: "Ohio University",
        type: "Exchange",
        emptyQuota: 2,
        totalQuota: 4,
        departments:[" CS "," IE "]

      },
    ],
    eramusUniversities: [],
    hostUniDepartments: [],
    erasmusDepartments: [],
    exchangeDepartments: [],
  };
  
  const universityReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_DEPARTMENTS_SUCCESS:
        return {
          ...state,
          hostUniDepartments: action.payload.filter(dep => (!dep.erasmusUniversity && !dep.exchangeUniversity)),
          erasmusDepartments: action.payload.filter(dep => dep.erasmusUniversity),
          exchangeDepartments: action.payload.filter(dep => dep.exchangeUniversity),
        };
      case GET_UNIVERSITIES_SUCCESS:
          return {
            ...state,
            exchangeUniversities: action.payload.exchange,
            erasmusUniversities: action.payload.erasmus,
          };
      case DELETE_UNIVERSITY_SUCCESS:
        return;

      default:
        return state;
    }
  };
  
  export default universityReducer;
  