import { Router } from 'express';

import courierRoutes from './courierPackage.routes';
import deliveryRoutes from './delivery.routes';

const routes = Router();

routes.use('/couriers', courierRoutes);
routes.use('/deliveries', deliveryRoutes);

export default routes;
