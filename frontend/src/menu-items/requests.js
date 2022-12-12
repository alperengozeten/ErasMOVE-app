// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const requests = authType => { 
    const adminStaff = {
        id: 'requests',
        title: 'Requests',
        type: 'group',
        children: [
            {
                id: 'requests',
                title: 'Document Requests',
                type: 'item',
                url: '/main/requests',
                icon: icons.IconDashboard,
                breadcrumbs: false
            },
        ]
    };

    const courseCoordinator = {
        id: 'requests',
        title: 'Requests',
        type: 'group',
        children: [
            {
                id: 'courseRequests',
                title: 'Course Requests',
                type: 'item',
                url: '/main/courseRequests',
                icon: icons.IconDashboard,
                breadcrumbs: false
            },
        ]
    };

    const departmentCoordinator = {
        id: 'requests',
        title: 'Requests',
        type: 'group',
        children: [
            {
                id: 'requests',
                title: 'Pre-Approval Forms',
                type: 'item',
                url: '/main/preApprovalForms',
                icon: icons.IconDashboard,
                breadcrumbs: false
            },{
                id: 'courseRequests',
                title: 'Course Requests',
                type: 'item',
                url: '/main/courseRequests',
                icon: icons.IconDashboard,
                breadcrumbs: false
            },
        ]
    };

    if (authType === "Administrative Staff")
        return adminStaff;
    else if (authType === "Course Coordinator")
        return courseCoordinator;
    else 
        return departmentCoordinator;
};

export default requests;