import { Seeder, Factory } from 'typeorm-seeding';

import File from '../../models/File';

export default class CreateFiles implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(File)().createMany(5);
  }
}
