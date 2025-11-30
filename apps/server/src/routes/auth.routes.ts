import { Router } from 'express';

import {
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
    registerValidateTokenController,
} from '../controllers/auth/index.js';

export const authRoutes: Router = Router();

authRoutes.post('/register', registerMiddlewares, registerController);
authRoutes.post('/validateUser', validateTokenMiddlewares, registerValidateTokenController);
authRoutes.post('/login', loginMiddlewares, loginController);
authRoutes.post('/logout', logoutController);

authRoutes.post('/forgotPassword', forgotPasswordMiddlewares, forgotPasswordController);
authRoutes.post('/validateToken', validateTokenMiddlewares, validateTokenController);
authRoutes.post('/resetPassword', resetPasswordMiddlewares, resetPasswordController);
