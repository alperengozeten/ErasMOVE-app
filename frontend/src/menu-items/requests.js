// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const requests = {
    id: 'requests',
    title: 'Document Requests',
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

export default requests;