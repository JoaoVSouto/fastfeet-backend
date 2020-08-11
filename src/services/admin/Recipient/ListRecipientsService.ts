import { getRepository } from 'typeorm';

import Recipient from '@models/Recipient';

interface IRequest {
  recipient_name?: string;
}

class ListRecipientsService {
  public async execute(req: IRequest): Promise<Recipient[]> {
    const { recipient_name = '' } = req;

    const recipientRepository = getRepository(Recipient);

    const recipients = await recipientRepository
      .createQueryBuilder('recipient')
      .where('recipient.name ilike :recipient_name', {
        recipient_name: `%${recipient_name}%`,
      })
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
