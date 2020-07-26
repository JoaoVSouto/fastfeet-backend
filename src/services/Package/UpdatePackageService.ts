import { getRepository } from 'typeorm';

import AppError from '@errors/AppError';

import Package from '@models/Package';
import Courier from '@models/Courier';
import Recipient from '@models/Recipient';

import { IRequest as IPackage } from './CreatePackageService';

interface IRequest extends Partial<IPackage> {
  id: number;
}

class UpdatePackageService {
  public async execute(req: IRequest): Promise<Package> {
    const { id, courier_id, recipient_id, product } = req;

    const packageRepository = getRepository(Package);

    const pkg = await packageRepository.findOne(id);

    if (!pkg) {
      throw new AppError('Package not found', 404);
    }

    let courier: Courier | null = null;

    if (courier_id) {
      courier = await getRepository(Courier).findOne(courier_id);

      if (!courier) {
        throw new AppError('Courier not found', 404);
      }

      pkg.courier = courier;
    }

    let recipient: Recipient | null = null;

    if (recipient_id) {
      recipient = await getRepository(Recipient).findOne(recipient_id);

      if (!recipient) {
        throw new AppError('Recipient not found', 404);
      }

      pkg.recipient = recipient;
    }

    const packageUpdated = await packageRepository.save({ ...pkg, product });

    delete packageUpdated.recipient_id;
    delete packageUpdated.courier_id;
    delete packageUpdated.signature_id;
    delete packageUpdated.canceled_at;
    delete packageUpdated.start_date;
    delete packageUpdated.end_date;
    delete packageUpdated.created_at;
    delete packageUpdated.updated_at;
    delete packageUpdated.recipient?.created_at;
    delete packageUpdated.recipient?.updated_at;
    delete packageUpdated.courier?.created_at;
    delete packageUpdated.courier?.updated_at;

    return packageUpdated;
  }
}

export default UpdatePackageService;
