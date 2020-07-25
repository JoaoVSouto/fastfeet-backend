import { Router } from 'express';
import multer from 'multer';

import multerConfig from '@config/upload';

import ensureAuthenticated from '@middlewares/ensureAuthenticated';

import CourierValidator from '@validators/CourierValidator';

import ListCouriersService from '@services/Courier/ListCouriersService';
import ShowCourierService from '@services/Courier/ShowCourierService';
import CreateCourierService from '@services/Courier/CreateCourierService';

const routes = Router();

const upload = multer(multerConfig);

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

routes.post(
  '/',
  upload.single('avatar'),
  CourierValidator.create(),
  async (req, res) => {
    const { name, email } = req.body;

    const createCourier = new CreateCourierService();

    const courier = await createCourier.execute({
      name,
      email,
      originalFileName: req?.file?.originalname,
      persistedFileName: req?.file?.filename,
    });

    return res.json(courier);
  },
);

export default routes;
