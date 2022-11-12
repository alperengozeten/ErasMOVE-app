// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Pages',
    caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'userTable',
            title: 'Table',
            type: 'item',
            url: '/main/userTable',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
    ]
};

export default pages;
