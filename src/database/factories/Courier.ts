import { define, factory } from 'typeorm-seeding';
import Faker from 'faker';

import Courier from '../../models/Courier';
import File from '../../models/File';

define(Courier, (faker: typeof Faker) => {
  const courier = new Courier();

  const hasAvatar = faker.random.boolean();

  courier.avatar = hasAvatar ? (factory(File)() as any) : null;
  courier.name = `${faker.name.firstName()} ${faker.name.lastName()}`;
  courier.email = faker.internet.email();

  return courier;
});
