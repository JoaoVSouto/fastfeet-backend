import { getRepository } from 'typeorm';

import AppError from '@errors/AppError';

import Package from '@models/Package';
import Recipient from '@models/Recipient';
import Courier from '@models/Courier';

interface IRequest {
  recipient_id: number;
  courier_id: number;
  product: string;
}

class CreatePackageService {
  public async execute(req: IRequest): Promise<Package> {
    const { recipient_id, courier_id, product } = req;

    const recipient = await getRepository(Recipient).findOne(recipient_id);

    if (!recipient) {
      throw new AppError('Recipient not found', 404);
    }

    const courier = await getRepository(Courier).findOne(courier_id);

    if (!courier) {
      throw new AppError('Courier not found', 404);
    }

    const packageRepository = getRepository(Package);

    const pkg = packageRepository.create({ recipient, courier, product });

    await packageRepository.save(pkg);

    delete pkg.recipient_id;
    delete pkg.courier_id;
    delete pkg.signature_id;
    delete pkg.canceled_at;
    delete pkg.start_date;
    delete pkg.end_date;
    delete pkg.created_at;
    delete pkg.updated_at;
    delete pkg.recipient.created_at;
    delete pkg.recipient.updated_at;
    delete pkg.courier.created_at;
    delete pkg.courier.updated_at;

    return pkg;
  }
}

export default CreatePackageService;
