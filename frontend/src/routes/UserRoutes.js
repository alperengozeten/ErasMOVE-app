import React from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
import UserProfile from '../components/UserProfile';

const UserRoutes = {
    path: '/user',
    element: <MainLayout />,
    children: [
        {
            path: '/user/profile1',
            element: <UserProfile />
        },
        
    ]
};

export default UserRoutes;