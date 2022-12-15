import axios from 'axios';

export const baseURL = 'http://localhost:8080';

// Login / Logout
export const userLogin = (authType, email, password) => (
  axios.post(`${baseURL}/user/login/${authType}?email=${email}&password=${password}`)
);

export const userLogout = (authType, id) => (
  axios.post(`${baseURL}/user/login/${authType}/${id}`)
);

export const adminLogin = (email, password) => (
  axios.post(`${baseURL}/admin/login?email=${email}&password=${password}`)
);

export const adminLogout = () => (
  axios.post(`${baseURL}/admin/logout`)
);

// User info
export const getUser = (authType, id) => (
  axios.get(`${baseURL}/${authType}/${id}`)
);

// Application Info
export const getApplication = id => (
  axios.get(`${baseURL}/application/outgoingStudent/${id}`)
);

// Elective course approvals
export const getElectiveCourseApprovals = (id, authType) => (
  axios.get(`${baseURL}/electiveCourseApprovalRequest/${authType}/${id}`)
);

export const createElectiveCourseApproval = courseApproval => (
  fetch(`${baseURL}/electiveCourseApprovalRequest/add`, {
    method: 'POST',
    headers: {
      'Content-type' : 'application/json'
    }, 
    body: JSON.stringify(courseApproval)
  })
);

export const acceptElectiveCourseApproval = (id, feedback) => (
  axios.post(`${baseURL}/electiveCourseApprovalRequest/accept/${id}?feedback=${feedback}`)
);

export const declineElectiveCourseApproval = (id, feedback) => (
  axios.post(`${baseURL}/electiveCourseApprovalRequest/decline/${id}?feedback=${feedback}`)
);

export const deleteElectiveCourseApproval = id => (
  axios.delete(`${baseURL}/electiveCourseApprovalRequest/delete/${id}`)
);

// Mandatory course approvals
export const getMandatoryCourseApprovals = (id, authType) => (
  axios.get(`${baseURL}/mandatoryCourseApprovalRequest/${authType}/${id}`)
);

export const createMandatoryCourseApproval = courseApproval => (
  fetch(`${baseURL}/mandatoryCourseApprovalRequest/add`, {
    method: 'POST',
    headers: {
      'Content-type' : 'application/json'
    }, 
    body: JSON.stringify(courseApproval)
  })
);

export const acceptMandatoryCourseApproval = (id, feedback) => (
  axios.post(`${baseURL}/mandatoryCourseApprovalRequest/accept/${id}?feedback=${feedback}`)
);

export const declineMandatoryCourseApproval = (id, feedback) => (
  axios.post(`${baseURL}/mandatoryCourseApprovalRequest/decline/${id}?feedback=${feedback}`)
);

export const deleteMandatoryCourseApproval = id => (
  axios.delete(`${baseURL}/mandatoryCourseApprovalRequest/delete/${id}`)
);

// PreApproval forms
export const getPreApprovalForms = (id, authType) => (
  axios.get(`${baseURL}/preApprovalForm/${authType}/${id}`)
);

export const createPreApprovalForm = (id, courseApproval) => (
  axios.post(`${baseURL}/preApprovalForm/add`, courseApproval)
);

export const deletePreApprovalForm = id => (
  axios.delete(`${baseURL}/preApprovalForm/delete/${id}`)
);

export const acceptPreApprvalForm = (id, feedback) => (
  axios.post(`${baseURL}/preApprovalForm/accept/${id}?feedback=${feedback}`)
);

export const declinePreApprovalForm = (id, feedback) => (
  axios.post(`${baseURL}/preApprovalForm/accept/${id}?feedback=${feedback}`)
);

// Replacement request exchange
export const sendExchangeReplacementRequest = replacementRequest => (
  axios.post(`${baseURL}/exchangeReplacementRequest/add/`, replacementRequest)
);

export const acceptExchangeReplacementRequest = id => (
  axios.post(`${baseURL}/exchangeReplacementRequest/outgoingStudent/${id}/accept`, )
);

export const declineExchangeReplacementRequest = id => (
  axios.post(`${baseURL}/exchangeReplacementRequest/outgoingStudent/${id}/decline`, )
);

// Replacement request erasmus
export const sendErasmusReplacementRequest = replacementRequest => (
  axios.post(`${baseURL}/erasmusReplacementRequest/add/`, replacementRequest)
);

export const acceptErasmusReplacementRequest = id => (
  axios.post(`${baseURL}/erasmusReplacementRequest/outgoingStudent/${id}/accept`, )
);

export const declineErasmusReplacementRequest = id => (
  axios.post(`${baseURL}/erasmusReplacementRequest/outgoingStudent/${id}/decline`, )
);

// Announcements
export const getAnnouncements = departmentId => (
  axios.get(`${baseURL}/announcement/department/${departmentId}`)
);

export const createAnnouncement = announcement => (
  fetch(`${baseURL}/announcement/add`, {
    method: 'POST',
    headers: {
      'Content-type' : 'application/json'
    }, 
    body: JSON.stringify(announcement)
  })
);

// Departments
export const getDepartments = () => (
  axios.get(`${baseURL}/department`)
);