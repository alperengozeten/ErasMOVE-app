import dashboard from './dashboard';
import pages from './pages';
import universities from './universities';
import requests from './requests';
import courseRequests from './courseRequests';
import announcements from './announcements';
import student from './student';
import preApprovalRequests from './preApprovalRequests.js';
import toDoList from './toDoList';




// ==============================|| MENU ITEMS ||============================== //

const menuItems = authType => {
    let list = [];

    if (authType === 'Outgoing Student') {
        list = [dashboard, student, announcements];
    } else if (authType === 'Incoming Student') {
        list = [dashboard, student, announcements];
    }  else if (authType === 'Department Coordinator') {
        list = [dashboard, pages, preApprovalRequests, announcements,toDoList];
    }  else if (authType === 'Course Coordinator') {
        list = [dashboard, pages, announcements, courseRequests,toDoList];
    } else if (authType === 'Administrative Staff') {
        list = [dashboard, pages, universities, announcements, requests,toDoList];
    } else if (authType === 'Admin') {
        // TODO: update this list
        list = [dashboard, student, pages, universities, announcements, requests, courseRequests,toDoList];
    }
    return list;
};

export default menuItems;
