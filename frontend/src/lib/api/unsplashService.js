import axios from 'axios';

export const baseURL = 'http://localhost:8080';


export const userLogin = (authType, email, password) => (
  axios.post(`${baseURL}/user/login/${authType}?email=${email}&password=${password}`)
);

export const userLogout = (authType, id) => (
  axios.post(`${baseURL}/user/login/${authType}/${id}`)
);

export const adminLogin = (email, password) => (
  axios.post(`${baseURL}/user/login/admin`, { params: {email, password} })
);

export const getUser = (authType, id) => (
  axios.get(`${baseURL}/${authType}/${id}`)
);



export const getElectiveCourseApprovals = (id, authType) => (
  axios.get(`${baseURL}/electiveCourseApprovalRequest/${authType}/${id}`)
);

export const getMandatoryCourseApprovals = (id, authType) => (
  axios.get(`${baseURL}/mandatoryCourseApprovalRequest/${authType}/${id}`)
);

export const getPreApprovalForms = (id, authType) => (
  axios.get(`${baseURL}/preApprovalForm/${authType}/${id}`)
);

export const acceptPreApprvalForm = (id, feedback) => (
  axios.post(`${baseURL}/preApprovalForm/accept/${id}`, { feedback })
);

export const declinePreApprovalForm = (id, feedback) => (
  axios.post(`${baseURL}/preApprovalForm/accept/${id}`, { feedback })
);



