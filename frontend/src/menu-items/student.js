// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const student = {
    id: 'student',
    title: 'Student',
    type: 'group',
    children: [
        {
            id: 'profile',
            title: 'Profile',
            type: 'item',
            url: '/main/profile',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'application',
            title: 'Application',
            type: 'item',
            url: '/main/application',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
        ,
        {
            id: 'proposal',
            title: 'Proposal',
            type: 'item',
            url: '/main/proposal',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
    ]
};

export default student;
