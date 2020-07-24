import { Seeder, Factory } from 'typeorm-seeding';

import Courier from '../../models/Courier';

export default class CreateCouriers implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Courier)().createMany(5);
  }
}
