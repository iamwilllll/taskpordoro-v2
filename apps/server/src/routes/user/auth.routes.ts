import { Router } from 'express';
import authControllers from './auth.controllers.js';
import handleInputsErrors from '../../middlewares/handleInputsErrors.js';
import registerMiddleware from '../../middlewares/registerMiddleware.js';

const authRoutes: Router = Router();

authRoutes.get('/register', registerMiddleware, handleInputsErrors, authControllers.register);
authRoutes.get('/login', authControllers.login);

export default authRoutes;
