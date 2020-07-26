import { Router } from 'express';

import ensureAuthenticated from '@middlewares/ensureAuthenticated';

import PackageValidator from '@validators/PackageValidator';

import ListPackagesService from '@services/Package/ListPackagesService';
import ShowPackageService from '@services/Package/ShowPackageService';

const routes = Router();

routes.use(ensureAuthenticated);

routes.get('/', async (req, res) => {
  const listPackages = new ListPackagesService();

  const packages = await listPackages.execute();

  return res.json(packages);
});

routes.get('/:id', PackageValidator.show(), async (req, res) => {
  const { id } = req.params;

  const showPackage = new ShowPackageService();

  const pkg = await showPackage.execute({ id: Number(id) });

  return res.json(pkg);
});

export default routes;
