import { Router } from 'express';

import ShowDeliveryProblemsService from '@services/client/DeliveryProblem/ShowDeliveryProblemsService';

const routes = Router();

routes.get('/:id/problems', async (req, res) => {
  const { id } = req.params;

  const showDeliveryProblems = new ShowDeliveryProblemsService();

  const problems = await showDeliveryProblems.execute({
    package_id: Number(id),
  });

  return res.json(problems);
});

export default routes;
