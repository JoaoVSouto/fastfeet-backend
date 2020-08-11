import { getRepository } from 'typeorm';

import Courier from '@models/Courier';

interface IRequest {
  courier_name?: string;
}

class ListCouriersService {
  public async execute(req: IRequest): Promise<Courier[]> {
    const { courier_name = '' } = req;

    const courierRepository = getRepository(Courier);

    const couriers = await courierRepository
      .createQueryBuilder('courier')
      .leftJoinAndSelect('courier.avatar', 'avatar')
      .where('courier.name ilike :courier_name', {
        courier_name: `%${courier_name}%`,
      })
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
