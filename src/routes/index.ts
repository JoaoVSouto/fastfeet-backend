import { Router } from 'express';

import sessionsRoutes from './sessions.routes';
import recipientsRoutes from './recipients.routes';

const routes = Router();

routes.use('/sessions', sessionsRoutes);
routes.use('/recipients', recipientsRoutes);

export default routes;
