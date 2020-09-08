import { getRepository } from 'typeorm';

import AppError from '@errors/AppError';

import DeliveryProblem from '@models/DeliveryProblem';

interface IRequest {
  id: number;
}

class ShowProblemService {
  public async execute(req: IRequest): Promise<DeliveryProblem> {
    const { id } = req;

    const deliveryProblemRepository = getRepository(DeliveryProblem);

    const deliveryProblem = await deliveryProblemRepository.findOne(id);

    if (!deliveryProblem) {
      throw new AppError('Delivery problem not found', 404);
    }

    return deliveryProblem;
  }
}

export default ShowProblemService;
