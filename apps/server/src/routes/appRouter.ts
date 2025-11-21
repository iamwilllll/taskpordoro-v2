import { Router } from 'express';
import authRoutes from './user/auth.routes.js';

const appRouter: Router = Router();

appRouter.use(authRoutes);

export default appRouter;
