import { Router } from 'express';

import CourierPackageValidator from '@validators/CourierPackageValidator';

import ListCourierPackagesService from '@services/client/CourierPackage/ListCourierPackagesService';
import StartPackageDeliveryService from '@services/client/CourierPackage/StartPackageDeliveryService';

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

routes.put(
  '/:id/start_package_delivery',
  CourierPackageValidator.startPackageDelivery(),
  async (req, res) => {
    const { id } = req.params;
    const { package_id, start_date } = req.body;

    const startPackageDelivery = new StartPackageDeliveryService();

    const pkg = await startPackageDelivery.execute({
      courier_id: Number(id),
      package_id,
      start_date,
    });

    return res.json(pkg);
  },
);

export default routes;
