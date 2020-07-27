import { getRepository } from 'typeorm';

import AppError from '@errors/AppError';

import Package from '@models/Package';

interface IRequest {
  id: number;
}

class DeletePackageService {
  public async execute(req: IRequest): Promise<Package> {
    const { id } = req;

    const packageRepository = getRepository(Package);

    const pkg = await packageRepository.findOne(id);

    if (!pkg) {
      throw new AppError('Package not found', 404);
    }

    await packageRepository.remove(pkg);

    delete pkg.created_at;
    delete pkg.updated_at;

    return pkg;
  }
}

export default DeletePackageService;
