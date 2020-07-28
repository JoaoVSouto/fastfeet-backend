import { Router } from 'express';

import commonRoutes from './common';
import clientRoutes from './client';
import adminRoutes from './admin';

const routes = Router();

routes.use(commonRoutes);
routes.use(clientRoutes);
routes.use(adminRoutes);

export default routes;
