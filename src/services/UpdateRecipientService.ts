import { getRepository } from 'typeorm';

import AppError from '@errors/AppError';

import Recipient from '@models/Recipient';

import { IRequest as IRecipient } from './CreateRecipientService';

interface IRequest extends Partial<IRecipient> {
  id: number;
}

class UpdateRecipientService {
  public async execute(req: IRequest): Promise<Recipient> {
    const { id, ...recipientData } = req;

    const recipientRepository = getRepository(Recipient);

    const recipient = await recipientRepository.findOne(id);

    if (!recipient) {
      throw new AppError('Recipient not found', 404);
    }

    return recipientRepository.save({ id, ...recipientData });
  }
}

export default UpdateRecipientService;
