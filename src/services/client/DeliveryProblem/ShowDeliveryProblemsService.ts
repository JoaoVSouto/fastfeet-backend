import { getRepository } from 'typeorm';

import DeliveryProblem from '@models/DeliveryProblem';

interface IRequest {
  package_id: number;
}

class ShowDeliveryProblemsService {
  public async execute(req: IRequest): Promise<DeliveryProblem[]> {
    const { package_id } = req;

    const deliveryProblemRepository = getRepository(DeliveryProblem);

    const problems = await deliveryProblemRepository
      .createQueryBuilder('delivery_problem')
      .leftJoinAndSelect('delivery_problem.package', 'package')
      .where('package.id = :id', { id: package_id })
      .select([
        'delivery_problem.id',
        'delivery_problem.package_id',
        'delivery_problem.description',
        'delivery_problem.created_at',
      ])
      .getMany();

    return problems;
  }
}

export default ShowDeliveryProblemsService;
