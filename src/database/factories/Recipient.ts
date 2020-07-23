import { define } from 'typeorm-seeding';
import Faker from 'faker';

import Recipient from '../../models/Recipient';

define(Recipient, (faker: typeof Faker) => {
  // eslint-disable-next-line no-param-reassign
  faker.locale = 'pt_BR';

  const name = `${faker.name.firstName()} ${faker.name.lastName()}`;
  const address_street = `${faker.address.streetSuffix()} ${
    faker.address.streetName().split(' ')[0]
  }`;
  const address_number = faker.random.number();
  const address_complement = faker.random.boolean()
    ? faker.address.secondaryAddress()
    : null;
  const address_cep = faker.address.zipCode('########');
  const uf = faker.address.stateAbbr();
  const city = faker.address.city();

  const recipient = new Recipient();

  recipient.name = name;
  recipient.address_street = address_street;
  recipient.address_number = address_number;
  recipient.address_complement = address_complement;
  recipient.address_cep = address_cep;
  recipient.uf = uf;
  recipient.city = city;

  return recipient;
});
