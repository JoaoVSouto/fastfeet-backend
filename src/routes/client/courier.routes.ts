import { Router } from 'express';

import CourierPackageValidator from '@validators/CourierPackageValidator';

import ListCourierPackagesService from '@services/client/ListCourierPackagesService';

const routes = Router();

routes.get(
  '/:id/packages',
  CourierPackageValidator.list(),
  async (req, res) => {
    const { id } = req.params;
    const { delivered } = req.query;

    const listCourierPackages = new ListCourierPackagesService();

    const packages = await listCourierPackages.execute({
      courier_id: Number(id),
      delivered: String(delivered),
    });

    return res.json(packages);
  },
);

export default routes;
