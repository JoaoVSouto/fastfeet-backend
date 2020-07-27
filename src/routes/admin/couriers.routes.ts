import { Router } from 'express';
import multer from 'multer';

import multerConfig from '@config/upload';

import CourierValidator from '@validators/CourierValidator';

import ListCouriersService from '@services/admin/Courier/ListCouriersService';
import ShowCourierService from '@services/admin/Courier/ShowCourierService';
import CreateCourierService from '@services/admin/Courier/CreateCourierService';
import UpdateCourierService from '@services/admin/Courier/UpdateCourierService';
import DeleteCourierService from '@services/admin/Courier/DeleteCourierService';

const routes = Router();

const upload = multer(multerConfig);

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

routes.put(
  '/',
  upload.single('avatar'),
  CourierValidator.update(),
  async (req, res) => {
    const { id, name, email } = req.body;

    const updateCourier = new UpdateCourierService();

    const courier = await updateCourier.execute({
      id,
      name,
      email,
      originalFileName: req?.file?.originalname,
      persistedFileName: req?.file?.filename,
    });

    return res.json(courier);
  },
);

routes.delete('/:id', CourierValidator.delete(), async (req, res) => {
  const { id } = req.params;

  const deleteCourier = new DeleteCourierService();

  const courier = await deleteCourier.execute({ id: Number(id) });

  return res.json(courier);
});

export default routes;
