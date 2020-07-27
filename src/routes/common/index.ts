import { Router } from 'express';

import sessionsRoutes from './sessions.routes';

const routes = Router();

routes.use('/sessions', sessionsRoutes);

export default routes;
