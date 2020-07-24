import { define } from 'typeorm-seeding';
import Faker from 'faker';

import File from '../../models/File';

define(File, (faker: typeof Faker) => {
  const [fileName, fileExt] = faker.system.fileName().split('.');

  const file = new File();
  file.name = `${fileName}.${fileExt}`;
  file.path = `${faker.random.uuid()}.${fileExt}`;

  return file;
});
