import { Router } from 'express';

import ensureAuthenticated from '@middlewares/ensureAuthenticated';

import RecipientValidator from '@validators/RecipientValidator';

import CreateRecipientService from '@services/Recipient/CreateRecipientService';
import UpdateRecipientService from '@services/Recipient/UpdateRecipientService';

const routes = Router();

routes.use(ensureAuthenticated);

routes.post('/', RecipientValidator.create(), async (req, res) => {
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

routes.put('/', RecipientValidator.update(), async (req, res) => {
  const {
    id,
    name,
    address_street,
    address_number,
    address_complement,
    address_cep,
    uf,
    city,
  } = req.body;

  const updateRecipient = new UpdateRecipientService();

  const recipient = await updateRecipient.execute({
    id,
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
