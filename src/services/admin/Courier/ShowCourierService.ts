import { getRepository } from 'typeorm';

import AppError from '@errors/AppError';

import Courier from '@models/Courier';

interface IRequest {
  id: number;
}

class ShowCourierService {
  public async execute(req: IRequest): Promise<Courier> {
    const { id } = req;

    const courierRepository = getRepository(Courier);

    const courier = await courierRepository
      .createQueryBuilder('courier')
      .leftJoinAndSelect('courier.avatar', 'avatar')
      .whereInIds(id)
      .select([
        'courier.id',
        'courier.name',
        'courier.email',
        'avatar.id',
        'avatar.path',
      ])
      .getOne();

    if (!courier) {
      throw new AppError('Courier not found', 404);
    }

    return courier;
  }
}

export default ShowCourierService;
