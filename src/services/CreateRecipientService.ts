import { getRepository } from 'typeorm';

import Recipient from '@models/Recipient';

interface IRequest {
  name: string;
  address_street: string;
  address_number: number;
  address_complement?: string;
  address_cep: string;
  uf: string;
  city: string;
}

class CreateRecipientService {
  public async execute(req: IRequest): Promise<Recipient> {
    const {
      name,
      address_street,
      address_number,
      address_complement,
      address_cep,
      uf,
      city,
    } = req;

    const recipientRepository = getRepository(Recipient);

    const recipient = recipientRepository.create({
      name,
      address_street,
      address_number,
      address_complement,
      address_cep,
      uf,
      city,
    });

    await recipientRepository.save(recipient);

    return recipient;
  }
}

export default CreateRecipientService;
