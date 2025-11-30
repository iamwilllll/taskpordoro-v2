import type { RouteObject } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

import AppLayout from '../layout/AppLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import ForgotPassword from '../pages/ForgotPassword';
import VerifyUser from '../pages/VerifyUser';

const AppRouter: RouteObject[] = [
    {
        element: <AppLayout />,
        children: [
            { path: '/', element: <Login /> },
            { path: '/register', element: <Register /> },
            { path: '/dashboard', element: <Dashboard /> },
            { path: '/forgotPassword', element: <ForgotPassword /> },
            { path: '/VerifyUser', element: <VerifyUser /> },
        ],
    },
];

const router = createBrowserRouter(AppRouter);
export default router;
