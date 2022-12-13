// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const adminUsersPage = {
    id: 'adminUsersPage',
    title: 'All Users',
    type: 'group',
    children: [
        {
            id: 'adminUsersPage',
            title: 'All Users',
            type: 'item',
            url: '/main/adminUsersPage',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
    ]
};

export default adminUsersPage;