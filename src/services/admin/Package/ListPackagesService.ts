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
        'package.product',
        'recipient.name',
        'recipient.city',
        'recipient.uf',
        'courier.name',
        'courier.avatar.path',
      ])
      .orderBy('package.id')
      .getMany();

    const packagesWithStatus = packages.map(pkg => {
      let status = 'retirada';

      if (pkg.canceled_at) {
        status = 'cancelada';
      }

      if (pkg.end_date) {
        status = 'entregue';
      }

      if (!pkg.start_date) {
        status = 'pendente';
      }

      return {
        ...pkg,
        status,
      };
    });

    return packagesWithStatus;
  }
}

export default ListPackagesService;
