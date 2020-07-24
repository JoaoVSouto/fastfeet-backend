import { Router } from 'express';

import ensureAuthenticated from '@middlewares/ensureAuthenticated';

import CourierValidator from '@validators/CourierValidator';

import ListCouriersService from '@services/Courier/ListCouriersService';
import ShowCourierService from '@services/Courier/ShowCourierService';

const routes = Router();

routes.use(ensureAuthenticated);

routes.get('/', async (req, res) => {
  const listCouriers = new ListCouriersService();

  const couriers = await listCouriers.execute();

  return res.json(couriers);
});

routes.get('/:id', CourierValidator.show(), async (req, res) => {
  const { id } = req.params;

  const showCourier = new ShowCourierService();

  const courier = await showCourier.execute({ id: Number(id) });

  return res.json(courier);
});

export default routes;
