import { Router } from 'express';

import DeliveryProblemValidator from '@validators/DeliveryProblemValidator';

import ListProblemsService from '@services/admin/DeliveryProblem/ListProblemsService';
import CancelPackageService from '@services/admin/Package/CancelPackageService';

const routes = Router();

routes.get('/', async (req, res) => {
  const listProblems = new ListProblemsService();

  const packagesWithProblem = await listProblems.execute();

  return res.json(packagesWithProblem);
});

routes.delete(
  '/:id/cancel-delivery',
  DeliveryProblemValidator.cancel(),
  async (req, res) => {
    const { id } = req.params;

    const cancelPackage = new CancelPackageService();

    const pkg = await cancelPackage.execute({ id: Number(id) });

    return res.json(pkg);
  },
);

export default routes;
