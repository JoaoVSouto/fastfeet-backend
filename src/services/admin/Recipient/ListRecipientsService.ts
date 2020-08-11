import { getRepository } from 'typeorm';

import Recipient from '@models/Recipient';

class ListRecipientsService {
  public async execute(): Promise<Recipient[]> {
    const recipientRepository = getRepository(Recipient);

    const recipients = await recipientRepository
      .createQueryBuilder('recipient')
      .select([
        'recipient.id',
        'recipient.name',
        'recipient.address_street',
        'recipient.address_number',
        'recipient.address_complement',
        'recipient.uf',
        'recipient.city',
      ])
      .orderBy('recipient.id')
      .getMany();

    return recipients;
  }
}

export default ListRecipientsService;
