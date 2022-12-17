import { ADD_UNIVERSITY_REQUEST, DELETE_UNIVERSITY_REQUEST, GET_COURSES_BY_DEPARTMENT_REQUEST, GET_DEPARTMENTS_REQUEST, GET_UNIVERSITIES_REQUEST } from "../constants/actionTypes";

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

export const getUniversities = () => 
    ({
        type: GET_UNIVERSITIES_REQUEST,
        payload: {},
    });

export const addUniversity = ({ university, isErasmus }) => 
    ({
        type: ADD_UNIVERSITY_REQUEST,
        payload: {university, isErasmus},
    });

export const deleteUniversity = ({ id }) => 
    ({
        type: DELETE_UNIVERSITY_REQUEST,
        payload: { id },
    });