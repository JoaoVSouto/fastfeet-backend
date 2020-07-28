import { Router } from 'express';

import courierRoutes from './courierPackage.routes';

const routes = Router();

routes.use('/couriers', courierRoutes);

export default routes;
