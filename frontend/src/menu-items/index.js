import dashboard from './dashboard';
import pages from './pages';
import universities from './universities';
import requests from './requests';
import announcements from './announcements';
import student from './student';
import toDoList from './toDoList';
import adminUsersPage from './adminUsersPage';





// ==============================|| MENU ITEMS ||============================== //

const menuItems = authType => {
    let list = [];

    if (authType === 'Outgoing Student') {
        list = [dashboard, student(authType), announcements];
    } else if (authType === 'Incoming Student') {
        list = [dashboard, student(authType), announcements];
    }  else if (authType === 'Department Coordinator') {
        list = [dashboard, pages, requests(authType), announcements, toDoList];
    }  else if (authType === 'Course Coordinator') {
        list = [dashboard, pages, requests(authType), announcements, toDoList];
    } else if (authType === 'Administrative Staff') {
        list = [dashboard, pages, requests(authType), universities, announcements, toDoList];
    } else if (authType === 'Admin') {
        // TODO: update this list
        list = [dashboard, student, pages, universities, announcements, toDoList, adminUsersPage];
    }
    return list;
};

export default menuItems;
