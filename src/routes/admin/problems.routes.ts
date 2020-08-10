import { Router } from 'express';

import ListProblemsService from '@services/admin/DeliveryProblem/ListProblemsService';

const routes = Router();

routes.get('/', async (req, res) => {
  const listProblems = new ListProblemsService();

  const packagesWithProblem = await listProblems.execute();

  return res.json(packagesWithProblem);
});

export default routes;
