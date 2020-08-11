import { getRepository } from 'typeorm';

import Package from '@models/Package';

interface IRequest {
  package_name?: string;
}

class ListPackagesService {
  public async execute(req: IRequest): Promise<Package[]> {
    const { package_name = '' } = req;

    const packageRepository = getRepository(Package);

    const packages = await packageRepository
      .createQueryBuilder('package')
      .leftJoinAndSelect('package.recipient', 'recipient')
      .leftJoinAndSelect('package.courier', 'courier')
      .leftJoinAndSelect('courier.avatar', 'courier.avatar')
      .where('package.product ilike :package_name', {
        package_name: `%${package_name}%`,
      })
      .select([
        'package.id',
        'package.start_date',
        'package.end_date',
        'package.canceled_at',
        'recipient.name',
        'recipient.city',
        'recipient.uf',
        'courier.name',
        'courier.avatar.path',
      ])
      .orderBy('package.id')
      .getMany();

    return packages;
  }
}

export default ListPackagesService;
