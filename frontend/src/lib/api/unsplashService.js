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

export const getAcceptedErasmusUniversity = id => (
  axios.get(`${baseURL}/erasmusUniversity/acceptedStudent/${id}`)
);

export const getAcceptedExchangeUniversity = id => (
  axios.get(`${baseURL}/exchangeUniversity/acceptedStudent/${id}`)
);

export const getApplicationsByDepartment = id => (
  axios.get(`${baseURL}/application/departmentID/${id}`)
);

// Notifications
export const getNotifications = id => (
  axios.get(`${baseURL}/notification/user/${id}`)
);

export const markAsReadNotification = id => (
  axios.post(`${baseURL}/notification/markRead/${id}`)
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

export const sendSyllabusElective = (id, syllabus) => (
  fetch(`${baseURL}/document/electiveCourseApproval/syllabus/${id}`, {
    method: 'POST',
    body: syllabus
  })
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

export const sendSyllabusMandatory = (id, syllabus) => (
  fetch(`${baseURL}/document/mandatoryCourseApproval/syllabus/${id}`, {
    method: 'POST',
    body: syllabus
  })
);

// PreApproval forms
export const getPreApprovalForms = (id, authType) => (
  axios.get(`${baseURL}/preApprovalForm/${authType}/${id}`)
);

export const getPreApprovalFormMobilityCourses = id => (
  axios.get(`${baseURL}/mobilityCourse/preApprovalForm/${id}`)
);

export const createPreApprovalForm = preApprovalForm => (
  fetch(`${baseURL}/preApprovalForm/add`, {
    method: 'POST',
    headers: {
      'Content-type' : 'application/json'
    }, 
    body: JSON.stringify(preApprovalForm)
  })
);

export const addMobilityCoursesToPreApprovalForm = (id, mobilityCourses) => (
  fetch(`${baseURL}//mobilityCourse/addAll/${id}`, {
    method: 'POST',
    headers: {
      'Content-type' : 'application/json'
    }, 
    body: JSON.stringify(mobilityCourses)
  })
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
