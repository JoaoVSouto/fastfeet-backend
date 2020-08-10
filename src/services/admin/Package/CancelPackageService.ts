import { getRepository } from 'typeorm';

import AppError from '@errors/AppError';

import DeliveryProblem from '@models/DeliveryProblem';
import Package from '@models/Package';

interface IRequest {
  id: number;
}

class CancelPackageService {
  public async execute(req: IRequest): Promise<Package> {
    const { id } = req;

    const deliveryProblemRepository = getRepository(DeliveryProblem);

    const deliveryProblem = await deliveryProblemRepository.findOne(id, {
      relations: ['package'],
    });

    if (!deliveryProblem) {
      throw new AppError('Delivery problem not found', 404);
    }

    const pkg = deliveryProblem.package;

    if (pkg.end_date) {
      throw new AppError('Package delivery is ended');
    }

    if (pkg.canceled_at) {
      throw new AppError('Package is already canceled');
    }

    if (!pkg.start_date) {
      throw new AppError('Package delivery have not been started');
    }

    pkg.canceled_at = new Date();

    await getRepository(Package).save(pkg);

    return pkg;
  }
}

export default CancelPackageService;
