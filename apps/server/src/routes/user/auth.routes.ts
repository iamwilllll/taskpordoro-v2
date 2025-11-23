import { Router } from 'express';
import authControllers from './auth.controllers.js';
import { handleInputsErrors, registerMiddlewares, loginMiddlewares, validateToken } from '../../middlewares/index.js';

const authRoutes: Router = Router();

authRoutes.post('/register', registerMiddlewares, handleInputsErrors, authControllers.register);
authRoutes.post('/login', loginMiddlewares, handleInputsErrors, authControllers.login);
authRoutes.post('/logout', authControllers.logout);

authRoutes.get('/profile', validateToken, authControllers.profile);

export default authRoutes;
