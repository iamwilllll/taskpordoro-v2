import { Router } from 'express';
import { validateToken } from '../middlewares/index.js';
import { getUserController } from '../controllers/user/getUser.controller.js';

export const userRoutes: Router = Router();

userRoutes.get('/profile', validateToken, getUserController);
