import { Router } from 'express';

import {
    handleInputsErrors,
    registerMiddlewares,
    loginMiddlewares,
    forgotPasswordMiddlewares,
    validateTokenMiddlewares,
    resetPasswordMiddlewares,
} from '../middlewares/index.js';

import {
    registerController,
    loginController,
    logoutController,
    forgotPasswordController,
    validateTokenController,
    resetPasswordController,
} from '../controllers/auth/index.js';

export const authRoutes: Router = Router();

authRoutes.post('/register', registerMiddlewares, registerController);
authRoutes.post('/login', loginMiddlewares, handleInputsErrors, loginController);
authRoutes.post('/logout', logoutController);

authRoutes.post('/forgotPassword', forgotPasswordMiddlewares, forgotPasswordController);
authRoutes.post('/validateToken', validateTokenMiddlewares, validateTokenController);
authRoutes.post('/resetPassword', resetPasswordMiddlewares, resetPasswordController);
