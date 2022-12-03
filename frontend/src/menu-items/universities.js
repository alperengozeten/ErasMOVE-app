// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const universities = {
    id: 'universities',
    title: 'Universities',
    type: 'group',
    children: [
        {
            id: 'universities',
            title: 'Universities',
            type: 'item',
            url: '/main/universities',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
    ]
};

export default universities;
