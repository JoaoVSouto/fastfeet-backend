import path from 'path';

import { getRepository } from 'typeorm';

import AppError from '@errors/AppError';

import deleteFile from '@utils/deleteFile';

import { uploadsDir } from '@config/upload';

import Courier from '@models/Courier';
import File from '@models/File';

interface IRequest {
  name: string;
  email: string;
  originalFileName?: string;
  persistedFileName?: string;
}

interface IResponse {
  id: number;
  name: string;
  email: string;
  avatar: {
    id: number;
    path: string;
  };
}

class CreateCourierService {
  public async execute(req: IRequest): Promise<IResponse> {
    const { name, email, originalFileName, persistedFileName } = req;

    const wasAvatarReceived = originalFileName && persistedFileName;

    const courierRepository = getRepository(Courier);

    const doesCourierExist = await courierRepository.findOne({
      where: { email },
    });

    if (doesCourierExist) {
      if (wasAvatarReceived) {
        await deleteFile(
          path.resolve(uploadsDir, 'couriers', persistedFileName),
        );
      }

      throw new AppError('Courier already exists');
    }

    let avatar: File | null = null;

    if (wasAvatarReceived) {
      const fileRepository = getRepository(File);

      avatar = fileRepository.create({
        name: originalFileName,
        path: persistedFileName,
      });

      await fileRepository.save(avatar);
    }

    const courier = courierRepository.create({
      name,
      email,
      avatar,
    });

    await courierRepository.save(courier);

    return {
      id: courier.id,
      name,
      email,
      avatar: avatar
        ? {
            id: avatar.id,
            path: avatar.path,
          }
        : null,
    };
  }
}

export default CreateCourierService;
