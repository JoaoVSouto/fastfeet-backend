import { Router } from 'express';

import RecipientValidator from '@validators/RecipientValidator';

import ListRecipientsService from '@services/admin/Recipient/ListRecipientsService';
import CreateRecipientService from '@services/admin/Recipient/CreateRecipientService';
import UpdateRecipientService from '@services/admin/Recipient/UpdateRecipientService';

const routes = Router();

routes.get('/', async (req, res) => {
  const listRecipients = new ListRecipientsService();

  const recipients = await listRecipients.execute();

  return res.json(recipients);
});

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
