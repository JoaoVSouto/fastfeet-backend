import { define, factory } from 'typeorm-seeding';
import Faker from 'faker';

import DeliveryProblem from '../../models/DeliveryProblem';
import Package from '../../models/Package';

define(DeliveryProblem, (faker: typeof Faker) => {
  const deliveryProblem = new DeliveryProblem();

  deliveryProblem.package = factory(Package)() as any;
  deliveryProblem.description = faker.random.words();

  return deliveryProblem;
});
