// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const students = {
    id: 'students',
    title: 'Students',
    type: 'group',
    children: [
        {
            id: 'applicationList',
            title: 'Application List',
            type: 'item',
            url: '/main/applicationList',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'placementList',
            title: 'Placement List',
            type: 'item',
            url: '/main/placementList',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'waitingList',
            title: 'Waiting List',
            type: 'item',
            url: '/main/waitingList',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
    ]
};

export default students;
