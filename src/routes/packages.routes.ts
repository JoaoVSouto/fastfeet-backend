import { Router } from 'express';

import ensureAuthenticated from '@middlewares/ensureAuthenticated';

import ListPackagesService from '@services/Package/ListPackagesService';

const routes = Router();

routes.use(ensureAuthenticated);

routes.get('/', async (req, res) => {
  const listPackages = new ListPackagesService();

  const packages = await listPackages.execute();

  return res.json(packages);
});

export default routes;
