import { GET_COURSES_BY_DEPARTMENT_REQUEST, GET_DEPARTMENTS_REQUEST } from "../constants/actionTypes";

// Courses
export const getCoursesByDepartment = (type, department, university) => 
    ({
        type: GET_COURSES_BY_DEPARTMENT_REQUEST,
        payload: { type, department, university },
    });

// Departments
export const getDepartments = () => 
    ({
        type: GET_DEPARTMENTS_REQUEST,
        payload: {},
    });