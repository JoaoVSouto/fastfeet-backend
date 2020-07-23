import { Router } from 'express';

import ensureAuthenticated from '@middlewares/ensureAuthenticated';

const routes = Router();

routes.use(ensureAuthenticated);

routes.get('/', (req, res) => {
  return res.json({ auth: true });
});

export default routes;
