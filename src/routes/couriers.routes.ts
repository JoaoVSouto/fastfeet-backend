import { Router } from 'express';

import ensureAuthenticated from '@middlewares/ensureAuthenticated';

import ListCouriersService from '@services/Courier/ListCouriersService';

const routes = Router();

routes.use(ensureAuthenticated);

routes.get('/', async (req, res) => {
  const listCouriers = new ListCouriersService();

  const couriers = await listCouriers.execute();

  return res.json(couriers);
});

export default routes;
