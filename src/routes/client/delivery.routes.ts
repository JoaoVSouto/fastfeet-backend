import { Router } from 'express';

import DeliveryProblemValidator from '@validators/DeliveryProblemValidator';

import ShowDeliveryProblemsService from '@services/client/DeliveryProblem/ShowDeliveryProblemsService';
import CreateDeliveryProblemService from '@services/client/DeliveryProblem/CreateDeliveryProblemService';

const routes = Router();

routes.get(
  '/:id/problems',
  DeliveryProblemValidator.show(),
  async (req, res) => {
    const { id } = req.params;

    const showDeliveryProblems = new ShowDeliveryProblemsService();

    const problems = await showDeliveryProblems.execute({
      package_id: Number(id),
    });

    return res.json(problems);
  },
);

routes.post('/:id/problems', async (req, res) => {
  const { id } = req.params;
  const { courier_id, description } = req.body;

  const createDeliveryProblem = new CreateDeliveryProblemService();

  const deliveryProblem = await createDeliveryProblem.execute({
    package_id: Number(id),
    courier_id,
    description,
  });

  return res.json(deliveryProblem);
});

export default routes;
