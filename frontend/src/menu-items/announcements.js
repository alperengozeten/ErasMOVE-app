// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const announcements = {
    id: 'announcements',
    title: 'Announcements',
    type: 'group',
    children: [
        {
            id: 'announcements',
            title: 'Announcements',
            type: 'item',
            url: '/main/announcements',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
    ]
};

export default announcements;