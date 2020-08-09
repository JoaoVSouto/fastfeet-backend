import { Seeder, Factory } from 'typeorm-seeding';

import DeliveryProblem from '../../models/DeliveryProblem';

export default class CreateDeliveryProblems implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(DeliveryProblem)().createMany(5);
  }
}
