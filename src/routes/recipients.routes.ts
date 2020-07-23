import { Router } from 'express';

import ensureAuthenticated from '@middlewares/ensureAuthenticated';

import CreateRecipientService from '@services/CreateRecipientService';

const routes = Router();

routes.use(ensureAuthenticated);

routes.post('/', async (req, res) => {
  const {
    name,
    address_street,
    address_number,
    address_complement,
    address_cep,
    uf,
    city,
  } = req.body;

  const createRecipient = new CreateRecipientService();

  const recipient = await createRecipient.execute({
    name,
    address_street,
    address_number,
    address_complement,
    address_cep,
    uf,
    city,
  });

  return res.json(recipient);
});

export default routes;
