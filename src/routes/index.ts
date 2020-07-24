import { Router } from 'express';

import sessionsRoutes from './sessions.routes';
import recipientsRoutes from './recipients.routes';
import couriersRoutes from './couriers.routes';

const routes = Router();

routes.use('/sessions', sessionsRoutes);
routes.use('/recipients', recipientsRoutes);
routes.use('/couriers', couriersRoutes);

export default routes;
