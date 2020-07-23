import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ auth: true });
});

export default routes;
