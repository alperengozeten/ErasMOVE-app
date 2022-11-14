import React from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
import DashboardContainer from '../containers/DashboardContainer';
import ApplicationList from '../components/studentLists/ApplicationList';
import PlacementList from '../components/studentLists/PlacementList';
import WaitingList from '../components/studentLists/WaitingList';

const MainRoutes = {
    path: '/main',
    element: <MainLayout />,
    children: [
        {
            path: '/main',
            element: <DashboardContainer />
        },
        {
            path: '/main/applicationList',
            element: <ApplicationList />
        },
        {
            path: '/main/placementList',
            element: <PlacementList />
        },
        {
            path: '/main/waitingList',
            element: <WaitingList />
        },
    ]
};

export default MainRoutes;
