// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const toDoList = {
    id: 'toDoList',
    title: 'To Do List',
    type: 'group',
    children: [
        {
            id: 'toDoList',
            title: 'To Do List',
            type: 'item',
            url: '/main/toDoList',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
    ]
};

export default toDoList;