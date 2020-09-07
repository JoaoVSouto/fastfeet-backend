import { getRepository } from 'typeorm';

import DeliveryProblem from '@models/DeliveryProblem';

class ListProblemsService {
  public async execute(): Promise<DeliveryProblem[]> {
    const deliveryProblemRepository = getRepository(DeliveryProblem);

    const packagesWithProblem = await deliveryProblemRepository
      .createQueryBuilder('delivery_problem')
      .leftJoinAndSelect('delivery_problem.package', 'package')
      .where('package.end_date IS NULL')
      .andWhere('package.start_date IS NOT NULL')
      .andWhere('package.canceled_at IS NULL')
      .orderBy('delivery_problem.created_at', 'DESC')
      .select([
        'delivery_problem.id',
        'delivery_problem.package_id',
        'delivery_problem.description',
      ])
      .orderBy('delivery_problem.package_id')
      .getMany();

    return packagesWithProblem;
  }
}

export default ListProblemsService;
