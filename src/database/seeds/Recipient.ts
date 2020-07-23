import { Seeder, Factory } from 'typeorm-seeding';

import Recipient from '../../models/Recipient';

export default class CreateRecipients implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Recipient)().createMany(5);
  }
}
