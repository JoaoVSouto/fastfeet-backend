import { define, factory } from 'typeorm-seeding';
import Faker from 'faker';

import Package from '../../models/Package';
import Recipient from '../../models/Recipient';
import Courier from '../../models/Courier';
import File from '../../models/File';

define(Package, (faker: typeof Faker) => {
  const startDate = faker.date.future();
  const canceledDate = faker.date.future(1, startDate);
  const endDate = faker.date.future(1, startDate);

  const isCanceled = faker.random.boolean();

  const pkg = new Package();

  pkg.recipient = factory(Recipient)() as any;
  pkg.courier = factory(Courier)() as any;
  pkg.signature = !isCanceled ? (factory(File)() as any) : null;
  pkg.product = faker.commerce.product();
  pkg.start_date = startDate;
  pkg.canceled_at = isCanceled ? canceledDate : null;
  pkg.end_date = !isCanceled ? endDate : null;

  return pkg;
});
