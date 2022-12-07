import dashboard from './dashboard';
import pages from './pages';
import utilities from './utilities';
import other from './other';
import universities from './universities';
import requests from './requests';
import courseRequests from './courseRequests';
import announcements from './announcements';
import student from './student';


// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [dashboard, student, pages, universities, announcements, requests, courseRequests, utilities, other]
};

export default menuItems;
