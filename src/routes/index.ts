import { Router } from 'express';

import commonRoutes from './common';
import adminRoutes from './admin';

const routes = Router();

routes.use(commonRoutes);
routes.use(adminRoutes);

export default routes;
