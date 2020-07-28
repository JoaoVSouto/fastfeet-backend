import { Router } from 'express';

import courierRoutes from './courier.routes';

const routes = Router();

routes.use('/couriers', courierRoutes);

export default routes;
