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

export const getAcceptedErasmusDepartment = id => (
  axios.get(`${baseURL}/erasmusUniversityDepartment/acceptedStudent/${id}`)
);

export const getAcceptedExchangeUniversity = id => (
  axios.get(`${baseURL}/exchangeUniversity/acceptedStudent/${id}`)
);

export const getAcceptedExchangeDepartment = id => (
  axios.get(`${baseURL}/exchangeUniversityDepartment/acceptedStudent/${id}`)
);

export const getApplicationsByDepartment = id => (
  axios.get(`${baseURL}/application/departmentID/${id}`)
);

export const getLanguageByStudentId = id => ( //TO BE CHANGED
  axios.get(`${baseURL}/outgoingStudent/language/outgoingStudent/${id}`)
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

export const getElectiveCourseApprovalDocument = id => (
  axios.get(`${baseURL}/document/electiveCourseApproval/${id}`)
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

export const getMandatoryCourseApprovalDocument = id => (
  axios.get(`${baseURL}/document/mandatoryCourseApproval/${id}`)
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
  fetch(`${baseURL}/mobilityCourse/addAll/${id}`, {
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
  axios.post(`${baseURL}/preApprovalForm/decline/${id}?feedback=${feedback}`)
);

// Replacement request exchange
export const getExchangeReplacementRequest = id => (
  axios.get(`${baseURL}/exchangeReplacementRequest/outgoingStudent/${id}`, )
);

export const sendExchangeReplacementRequest = replacementRequest => (
  fetch(`${baseURL}/exchangeReplacementRequest/add`, {
    method: 'POST',
    headers: {
      'Content-type' : 'application/json'
    }, 
    body: JSON.stringify(replacementRequest)
  })
);

export const acceptExchangeReplacementRequest = id => (
  axios.post(`${baseURL}/exchangeReplacementRequest/accept/${id}`,)
);

export const declineExchangeReplacementRequest = id => (
  axios.post(`${baseURL}/exchangeReplacementRequest/decline/${id}`,)
);

export const getExchangeProposedReplacementRequest = id => (
  axios.get(`${baseURL}/exchangeReplacementRequest/proposedRequests/departmentCoordinator/${id}`, )
);

export const deleteExchangeProposedReplacementRequest = id => (
  axios.delete(`${baseURL}/exchangeReplacementRequest/delete/${id}`, )
);

// Replacement request erasmus
export const getErasmusReplacementRequest = id => (
  axios.get(`${baseURL}/erasmusReplacementRequest/outgoingStudent/${id}`, )
);

export const sendErasmusReplacementRequest = replacementRequest => (
  fetch(`${baseURL}/erasmusReplacementRequest/add`, {
    method: 'POST',
    headers: {
      'Content-type' : 'application/json'
    }, 
    body: JSON.stringify(replacementRequest)
  })
);

export const acceptErasmusReplacementRequest = id => (
  axios.post(`${baseURL}/erasmusReplacementRequest/accept/${id}`,)
);

export const declineErasmusReplacementRequest = id => (
  axios.post(`${baseURL}/erasmusReplacementRequest/decline/${id}`,)
);

export const getErasmusProposedReplacementRequest = id => (
  axios.get(`${baseURL}/erasmusReplacementRequest/proposedRequests/departmentCoordinator/${id}`, )
);

export const deleteErasmusReplacementRequest = id => (
  axios.delete(`${baseURL}/erasmusReplacementRequest/delete/${id}`, )
);

// File requests
export const getFileRequests = (id, typeForReq) => (
  axios.get(`${baseURL}/fileRequest/${typeForReq}/${id}`)
);

export const deleteFileRequest = id => (
  axios.delete(`${baseURL}/fileRequest/delete/${id}`)
);

export const createFileRequest = fileReq => (
  fetch(`${baseURL}/fileRequest/add`, {
    method: 'POST',
    headers: {
      'Content-type' : 'application/json'
    }, 
    body: JSON.stringify(fileReq)
  })
);

export const respondFileRequest = (id, file) => (
  fetch(`${baseURL}/fileRequest/respond/${id}`, {
    method: 'POST',
    body: file,
  })
);

export const respondFileRequestSendFile = (id, file) => (
  fetch(`${baseURL}/document/fileRequest/acceptanceLetter/${id}`, {
    method: 'POST',
    body: file,
  })
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

export const addDepartment = department => (
  fetch(`${baseURL}/department/add`, {
    method: 'POST',
    headers: {
      'Content-type' : 'application/json'
    }, 
    body: JSON.stringify(department)
  })
);

export const addMandatoryCourseToDepartment = (id, course) => (
  fetch(`${baseURL}/department/addCourse/${id}`, {
    method: 'POST',
    headers: {
      'Content-type' : 'application/json'
    }, 
    body: JSON.stringify(course)
  })
);

export const addElectiveCourseToDepartment = (id, course) => (
  fetch(`${baseURL}/department/addElectiveCourse/${id}`, {
    method: 'POST',
    headers: {
      'Content-type' : 'application/json'
    }, 
    body: JSON.stringify(course)
  })
);

// Universities
export const getExchangeUniversities = () => (
  axios.get(`${baseURL}/exchangeUniversity`)
);

export const getErasmusUniversities = () => (
  axios.get(`${baseURL}/erasmusUniversity`)
);

export const uploadStudentList = (type, department, list) => (
  fetch(`${baseURL}/administrativeStaff/addOutgoingStudents?departmentId=${department}&isErasmus=${type==='Erasmus'}`, {
    method: 'POST',
    headers: {
      'Content-type' : 'application/json'
    }, 
    body: JSON.stringify(list)
  })
);

export const placeStudentsErasmus = id => (
  axios.post(`${baseURL}/administrativeStaff/erasmus/place?departmentID=${id}`)
);

export const placeStudentsExchange = () => (
  axios.post(`${baseURL}/administrativeStaff/exchange/place`)
);