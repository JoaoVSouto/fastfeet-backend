import { getRepository } from 'typeorm';

import AppError from '@errors/AppError';

import Package from '@models/Package';

interface IRequest {
  id: number;
}

class ShowPackageService {
  public async execute(req: IRequest): Promise<Package> {
    const { id } = req;

    const packageRepository = getRepository(Package);

    const pkg = await packageRepository
      .createQueryBuilder('package')
      .where('package.id = :id', { id })
      .leftJoinAndSelect('package.recipient', 'recipient')
      .leftJoinAndSelect('package.signature', 'signature')
      .leftJoinAndSelect('package.courier', 'courier')
      .select([
        'package.id',
        'package.product',
        'signature.path',
        'recipient',
        'courier.id',
        'courier.name',
      ])
      .getOne();

    if (!pkg) {
      throw new AppError('Package not found', 404);
    }

    delete pkg.recipient.created_at;
    delete pkg.recipient.updated_at;

    return pkg;
  }
}

export default ShowPackageService;
