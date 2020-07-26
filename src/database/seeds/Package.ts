import { Seeder, Factory } from 'typeorm-seeding';

import Package from '../../models/Package';

export default class CreatePackages implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Package)().createMany(5);
  }
}
