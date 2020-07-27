import { getRepository } from 'typeorm';

import Courier from '@models/Courier';

class ListCouriersService {
  public async execute(): Promise<Courier[]> {
    const courierRepository = getRepository(Courier);

    const couriers = await courierRepository
      .createQueryBuilder('courier')
      .leftJoinAndSelect('courier.avatar', 'avatar')
      .select([
        'courier.id',
        'courier.name',
        'courier.email',
        'avatar.id',
        'avatar.path',
      ])
      .getMany();

    return couriers;
  }
}

export default ListCouriersService;
