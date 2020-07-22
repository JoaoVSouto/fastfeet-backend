import { Seeder, Factory } from 'typeorm-seeding';

import User from '../../models/User';

export default class CreateUser implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(User)().create();
  }
}
