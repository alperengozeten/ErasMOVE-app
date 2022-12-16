import { GET_APPLICATIONS_BY_DEPARTMENT_REQUEST } from "../constants/actionTypes";


export const getApplicationsByDepartment = (user, typeForReq) => ({
  type: GET_APPLICATIONS_BY_DEPARTMENT_REQUEST,
  payload: { user, typeForReq },
});