import { Router } from 'express';

import DeliveryProblemValidator from '@validators/DeliveryProblemValidator';

import ListProblemsService from '@services/admin/DeliveryProblem/ListProblemsService';
import ShowProblemService from '@services/admin/DeliveryProblem/ShowProblemService';
import CancelPackageService from '@services/admin/Package/CancelPackageService';

const routes = Router();

routes.get('/', async (req, res) => {
  const listProblems = new ListProblemsService();

  const packagesWithProblem = await listProblems.execute();

  return res.json(packagesWithProblem);
});

routes.get('/:id', async (req, res) => {
  const { id } = req.params;

  const showProblem = new ShowProblemService();

  const deliveryProblem = await showProblem.execute({ id: Number(id) });

  return res.json(deliveryProblem);
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
