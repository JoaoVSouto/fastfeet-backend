import { define } from 'typeorm-seeding';
import bcrypt from 'bcryptjs';

// by some reason the typeorm-seeding compiler cannot resolve "@models/User"
import User from '../../models/User';

define(User, () => {
  const user = new User();
  user.name = 'Distribuidora FastFeet';
  user.email = 'admin@fastfeet.com';
  user.password_hash = bcrypt.hashSync('123456', 8);

  return user;
});
