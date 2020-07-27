import { Router } from 'express';

import PackageValidator from '@validators/PackageValidator';

import ListPackagesService from '@services/admin/Package/ListPackagesService';
import ShowPackageService from '@services/admin/Package/ShowPackageService';
import CreatePackageService from '@services/admin/Package/CreatePackageService';
import UpdatePackageService from '@services/admin/Package/UpdatePackageService';
import DeletePackageService from '@services/admin/Package/DeletePackageService';

const routes = Router();

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

routes.post('/', PackageValidator.create(), async (req, res) => {
  const { recipient_id, courier_id, product } = req.body;

  const createPackage = new CreatePackageService();

  const pkg = await createPackage.execute({
    recipient_id,
    courier_id,
    product,
  });

  return res.json(pkg);
});

routes.put('/', PackageValidator.update(), async (req, res) => {
  const { id, courier_id, recipient_id, product } = req.body;

  const updatePackage = new UpdatePackageService();

  const pkg = await updatePackage.execute({
    id,
    courier_id,
    recipient_id,
    product,
  });

  return res.json(pkg);
});

routes.delete('/:id', PackageValidator.delete(), async (req, res) => {
  const { id } = req.params;

  const deletePackage = new DeletePackageService();

  const pkg = await deletePackage.execute({ id: Number(id) });

  return res.json(pkg);
});

export default routes;
