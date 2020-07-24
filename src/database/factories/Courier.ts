import { define, factory } from 'typeorm-seeding';
import Faker from 'faker';

import Courier from '../../models/Courier';
import File from '../../models/File';

define(Courier, (faker: typeof Faker) => {
  const courier = new Courier();

  courier.avatar = factory(File)() as any;
  courier.name = `${faker.name.firstName()} ${faker.name.lastName()}`;
  courier.email = faker.internet.email();

  return courier;
});
