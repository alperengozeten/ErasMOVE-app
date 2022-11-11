import React from 'react';

// project imports
import MinimalLayout from '../layout/MinimalLayout';
import LoginContainer from '../containers/LoginContainer';
import ForgotPasswordContainer from '../containers/ForgotPasswordContainer';

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/',
            element: <LoginContainer />
        },
        {
            path: '/forgotPassword',
            element: <ForgotPasswordContainer />
        }
    ]
};

export default AuthenticationRoutes;
