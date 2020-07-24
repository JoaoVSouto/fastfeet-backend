import { getRepository } from 'typeorm';

import AppError from '@errors/AppError';

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

    const courierRepository = getRepository(Courier);

    const doesCourierExist = await courierRepository.findOne({
      where: { email },
    });

    if (doesCourierExist) {
      throw new AppError('Courier already exists');
    }

    let avatar: File | null = null;

    if (originalFileName && persistedFileName) {
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
