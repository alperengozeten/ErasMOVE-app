import React from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
import DashboardContainer from '../containers/DashboardContainer';
import UserTable from '../components/table';

const MainRoutes = {
    path: '/main',
    element: <MainLayout />,
    children: [
        {
            path: '/main',
            element: <DashboardContainer />
        },
        {
            path: '/main/userTable',
            element: <UserTable />
        },
    ]
};

export default MainRoutes;
