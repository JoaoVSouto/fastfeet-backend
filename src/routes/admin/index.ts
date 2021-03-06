import { Router } from 'express';

import ensureAuthenticated from '@middlewares/ensureAuthenticated';

import recipientsRoutes from './recipients.routes';
import couriersRoutes from './couriers.routes';
import packagesRoutes from './packages.routes';
import problemsRoutes from './problems.routes';

const routes = Router();

routes.use(ensureAuthenticated);

routes.use('/recipients', recipientsRoutes);
routes.use('/couriers', couriersRoutes);
routes.use('/packages', packagesRoutes);
routes.use('/problems', problemsRoutes);

export default routes;
