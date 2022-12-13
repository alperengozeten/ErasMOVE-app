import { GET_COURSES_BY_DEPARTMENT_REQUEST } from "../constants/actionTypes";

export const getCoursesByDepartment = (type, department, university) => 
    ({
        type: GET_COURSES_BY_DEPARTMENT_REQUEST,
        payload: { type, department, university },
    });
