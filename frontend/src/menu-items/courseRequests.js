// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const courseRequests = {
    id: 'courseRequests',
    title: 'Course Requests',
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

export default courseRequests;