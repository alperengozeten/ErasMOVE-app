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
        list = [ student(authType), announcements];
    } else if (authType === 'Incoming Student') {
        list = [ student(authType), announcements];
    }  else if (authType === 'Department Coordinator') {
        list = [ pages, requests(authType), announcements, toDoList];
    }  else if (authType === 'Course Coordinator') {
        list = [ pages, requests(authType), announcements, toDoList];
    } else if (authType === 'Administrative Staff') {
        list = [ pages, requests(authType), universities, announcements, toDoList];
    } else if (authType === 'Admin') {
        // TODO: update this list
        list = [ adminUsersPage];
    }
    return list;
};

export default menuItems;
