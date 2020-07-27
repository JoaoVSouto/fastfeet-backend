import path from 'path';

import { getRepository } from 'typeorm';

import AppError from '@errors/AppError';

import deleteFile from '@utils/deleteFile';

import { uploadsDir } from '@config/upload';

import Courier from '@models/Courier';
import File from '@models/File';

import { IRequest as ICourier } from './CreateCourierService';

interface IRequest extends Partial<ICourier> {
  id: number;
}

class UpdateCourierService {
  public async execute(req: IRequest): Promise<Courier> {
    const { id, email, name, originalFileName, persistedFileName } = req;

    const wasAvatarReceived = originalFileName && persistedFileName;

    const courierRepository = getRepository(Courier);

    const courier = await courierRepository.findOne(id);

    if (!courier) {
      if (wasAvatarReceived) {
        await deleteFile(path.resolve(uploadsDir, persistedFileName));
      }

      throw new AppError('Courier not found', 404);
    }

    if (email) {
      const isUsedEmail = await courierRepository.findOne({ where: { email } });

      if (isUsedEmail && email !== courier.email) {
        if (wasAvatarReceived) {
          await deleteFile(path.resolve(uploadsDir, persistedFileName));
        }

        throw new AppError('Email has already been used');
      }
    }

    if (wasAvatarReceived) {
      const fileRepository = getRepository(File);

      const avatar = fileRepository.create({
        name: originalFileName,
        path: persistedFileName,
      });

      await fileRepository.save(avatar);

      if (courier.avatar_id) {
        const oldFile = await fileRepository.findOne(courier.avatar_id);
        await deleteFile(path.resolve(uploadsDir, oldFile.path));
        await fileRepository.remove(oldFile);
      }

      courier.avatar = avatar;
    }

    const courierUpdated = await courierRepository.save({
      ...courier,
      name,
      email,
    });

    delete courierUpdated.created_at;
    delete courierUpdated.updated_at;

    if (courierUpdated.avatar) {
      delete courier.avatar.name;
      delete courier.avatar.created_at;
      delete courier.avatar.updated_at;
    }

    return courierUpdated;
  }
}

export default UpdateCourierService;
