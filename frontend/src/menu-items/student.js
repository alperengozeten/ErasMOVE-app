// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const student = authType => {

    const incomingStudent ={
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
                id: 'proposalForStudent',
                title: 'Proposal',
                type: 'item',
                url: '/main/proposalForStudent',
                icon: icons.IconDashboard,
                breadcrumbs: false
            }
        ]
    };


    const outgoingStudent = {
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
        ]
    };

    if(authType === 'Incoming Student') 
        return incomingStudent;
    else
        return outgoingStudent;

};

export default student;
