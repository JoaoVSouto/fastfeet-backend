import path from 'path';

import { getRepository } from 'typeorm';

import AppError from '@errors/AppError';

import deleteFile from '@utils/deleteFile';

import { uploadsDir } from '@config/upload';

import Courier from '@models/Courier';
import File from '@models/File';

interface IRequest {
  id: number;
}

class DeleteCourierService {
  public async execute(req: IRequest): Promise<Courier> {
    const { id } = req;

    const courierRepository = getRepository(Courier);

    const courier = await courierRepository.findOne(id);

    if (!courier) {
      throw new AppError('Courier not found', 404);
    }

    if (courier.avatar_id) {
      const fileRepository = getRepository(File);

      const file = await fileRepository.findOne(courier.avatar_id);
      await deleteFile(path.resolve(uploadsDir, file.path));
      await fileRepository.remove(file);
    }

    await courierRepository.remove(courier);

    delete courier.created_at;
    delete courier.updated_at;

    return courier;
  }
}

export default DeleteCourierService;
