import { getRepository } from 'typeorm';

import AppError from '@errors/AppError';

import DeliveryProblem from '@models/DeliveryProblem';
import Package from '@models/Package';
import Courier from '@models/Courier';

interface IRequest {
  package_id: number;
  courier_id: number;
  description: string;
}

class CreateDeliveryProblemService {
  public async execute(req: IRequest): Promise<DeliveryProblem> {
    const { package_id, courier_id, description } = req;

    const courierRepository = getRepository(Courier);

    const courier = await courierRepository.findOne(courier_id);

    if (!courier) {
      throw new AppError('Courier not found', 404);
    }

    const packageRepository = getRepository(Package);

    const pkg = await packageRepository.findOne(package_id);

    if (!pkg) {
      throw new AppError('Package not found', 404);
    }

    if (pkg.courier_id !== courier.id) {
      throw new AppError('This package delivery belongs to another courier');
    }

    if (pkg.end_date) {
      throw new AppError('This package delivery is completed');
    }

    if (pkg.canceled_at) {
      throw new AppError('This package delivery is canceled');
    }

    if (!pkg.start_date) {
      throw new AppError('This package delivery have not been started');
    }

    const deliveryProblemRepository = getRepository(DeliveryProblem);

    const deliveryProblem = deliveryProblemRepository.create({
      package: pkg,
      description,
    });

    await deliveryProblemRepository.save(deliveryProblem);

    return deliveryProblem;
  }
}

export default CreateDeliveryProblemService;
