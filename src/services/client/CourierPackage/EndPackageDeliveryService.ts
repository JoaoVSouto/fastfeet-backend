import path from 'path';

import { getRepository } from 'typeorm';
import { parseISO, isValid, isFuture, isBefore } from 'date-fns';

import AppError from '@errors/AppError';

import deleteFile from '@utils/deleteFile';

import { uploadsDir } from '@config/upload';

import Courier from '@models/Courier';
import Package from '@models/Package';
import File from '@models/File';

interface IRequest {
  courier_id: number;
  package_id: number;
  end_date: string;
  originalFileName?: string;
  persistedFileName?: string;
}

class EndPackageDeliveryService {
  public async execute(req: IRequest): Promise<Package> {
    const {
      courier_id,
      package_id,
      end_date,
      originalFileName,
      persistedFileName,
    } = req;

    const wasAvatarReceived = originalFileName && persistedFileName;

    const courierRepository = getRepository(Courier);

    const courier = await courierRepository.findOne(courier_id);

    if (!courier) {
      if (wasAvatarReceived) {
        await deleteFile(path.resolve(uploadsDir, persistedFileName));
      }

      throw new AppError('Courier not found', 404);
    }

    const packageRepository = getRepository(Package);

    const pkg = await packageRepository.findOne(package_id);

    if (!pkg) {
      if (wasAvatarReceived) {
        await deleteFile(path.resolve(uploadsDir, persistedFileName));
      }

      throw new AppError('Package not found', 404);
    }

    if (pkg.courier_id !== courier_id) {
      if (wasAvatarReceived) {
        await deleteFile(path.resolve(uploadsDir, persistedFileName));
      }

      throw new AppError('This package delivery belongs to another courier');
    }

    if (pkg.end_date) {
      if (wasAvatarReceived) {
        await deleteFile(path.resolve(uploadsDir, persistedFileName));
      }

      throw new AppError('This package delivery has already been ended');
    }

    if (pkg.canceled_at) {
      if (wasAvatarReceived) {
        await deleteFile(path.resolve(uploadsDir, persistedFileName));
      }

      throw new AppError('This package delivery has been canceled');
    }

    if (!pkg.start_date) {
      if (wasAvatarReceived) {
        await deleteFile(path.resolve(uploadsDir, persistedFileName));
      }

      throw new AppError('Cannot end a delivery without starting it');
    }

    const endDateISO = parseISO(end_date);

    if (!isValid(endDateISO)) {
      if (wasAvatarReceived) {
        await deleteFile(path.resolve(uploadsDir, persistedFileName));
      }

      throw new AppError('Invalid date');
    }

    if (isBefore(endDateISO, pkg.start_date)) {
      if (wasAvatarReceived) {
        await deleteFile(path.resolve(uploadsDir, persistedFileName));
      }

      throw new AppError('End date cannot be before than start date');
    }

    if (isFuture(endDateISO)) {
      if (wasAvatarReceived) {
        await deleteFile(path.resolve(uploadsDir, persistedFileName));
      }

      throw new AppError('Future dates are not allowed');
    }

    if (wasAvatarReceived) {
      const fileRepository = getRepository(File);

      const signature = fileRepository.create({
        name: originalFileName,
        path: persistedFileName,
      });

      await fileRepository.save(signature);

      pkg.signature = signature;
    }

    pkg.end_date = endDateISO;

    return packageRepository.save(pkg);
  }
}

export default EndPackageDeliveryService;
