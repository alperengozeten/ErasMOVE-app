import { GET_APPLICATIONS_BY_DEPARTMENT_REQUEST } from "../constants/actionTypes";


export const getApplicationsByDepartment = (department, isErasmus) => ({
  type: GET_APPLICATIONS_BY_DEPARTMENT_REQUEST,
  payload: { department, isErasmus },
});