import { getRepository } from 'typeorm';

import AppError from '@errors/AppError';

import Courier from '@models/Courier';
import Package from '@models/Package';

interface IRequest {
  courier_id: number;
  delivered?: string;
}

class ListCourierPackagesService {
  public async execute(req: IRequest): Promise<Package[]> {
    const { courier_id, delivered } = req;

    const courier = await getRepository(Courier).findOne(courier_id);

    if (!courier) {
      throw new AppError('Courier not found', 404);
    }

    const shouldAppearDelivered = delivered === 'true';

    const packages = await getRepository(Package)
      .createQueryBuilder('package')
      .where('package.courier_id = :id', { id: courier_id })
      .andWhere('package.canceled_at IS NULL')
      .andWhere(
        `package.end_date IS ${shouldAppearDelivered ? 'NOT' : ''} NULL`,
      )
      .orderBy(
        `package.${shouldAppearDelivered ? 'end' : 'start'}_date`,
        'ASC',
        'NULLS FIRST',
      )
      .getMany();

    return packages;
  }
}

export default ListCourierPackagesService;
