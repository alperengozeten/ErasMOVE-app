import { ADD_COURSE_TO_DEPARTMENT_REQUEST, ADD_DEPARTMENT_REQUEST, ADD_HOST_DEPARTMENT_REQUEST, ADD_UNIVERSITY_REQUEST, DELETE_UNIVERSITY_REQUEST, GET_COURSES_BY_DEPARTMENT_REQUEST, GET_DEPARTMENTS_REQUEST, GET_UNIVERSITIES_REQUEST, UPLOAD_STUDENTS_LIST_REQUEST } from "../constants/actionTypes";

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

export const addHostDepartment = departmentName => 
    ({
        type: ADD_HOST_DEPARTMENT_REQUEST,
        payload: {departmentName},
    });

export const addCourseToDepartmentRequest = (course, departmentID, type) => 
    ({
        type: ADD_COURSE_TO_DEPARTMENT_REQUEST,
        payload: {course, departmentID, type},
    });

export const getUniversities = () => 
    ({
        type: GET_UNIVERSITIES_REQUEST,
        payload: {},
    });

export const addUniversity = ( university, isErasmus) => 
    ({
        type: ADD_UNIVERSITY_REQUEST,
        payload: {university, isErasmus},
    });

export const deleteUniversity = ({ id }) => 
    ({
        type: DELETE_UNIVERSITY_REQUEST,
        payload: { id },
    });

export const uploadStudentsRequest = ({ type, department, list }) => 
    ({
        type: UPLOAD_STUDENTS_LIST_REQUEST,
        payload: { type, department, list },
    });

export const addDepartment = (department, isErasmus) => 
    ({
        type: ADD_DEPARTMENT_REQUEST,
        payload: {department, isErasmus},
    });