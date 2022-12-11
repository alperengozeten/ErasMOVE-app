// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const requests = {
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
        },
    ]
};

export default requests;