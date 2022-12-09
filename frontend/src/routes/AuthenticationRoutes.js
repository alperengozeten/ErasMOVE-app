import React from 'react';

// project imports
import MinimalLayout from '../layout/MinimalLayout';
import LoginContainer from '../containers/LoginContainer';
import ForgotPasswordContainer from '../containers/ForgotPasswordContainer';
import LandingPage from '../components/LandingPage';

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/',
            element: <LandingPage />
        },
        {
            path: '/login',
            element: <LoginContainer />
        },
        {
            path: '/forgotPassword',
            element: <ForgotPasswordContainer />
        }
    ]
};

export default AuthenticationRoutes;
