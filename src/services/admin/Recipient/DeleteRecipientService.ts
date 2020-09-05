import { getRepository } from 'typeorm';

import AppError from '@errors/AppError';

import Recipient from '@models/Recipient';

interface IRequest {
  id: number;
}

class DeleteRecipientService {
  public async execute(req: IRequest): Promise<Recipient> {
    const { id } = req;

    const recipientRepository = getRepository(Recipient);

    const recipient = await recipientRepository.findOne(id);

    if (!recipient) {
      throw new AppError('Recipient not found', 404);
    }

    await recipientRepository.remove(recipient);

    delete recipient.created_at;
    delete recipient.updated_at;

    return recipient;
  }
}

export default DeleteRecipientService;
