import { getRepository, Between } from 'typeorm';
import {
  parseISO,
  isValid,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  isAfter,
  startOfDay,
  endOfDay,
  isFuture,
} from 'date-fns';

import AppError from '@errors/AppError';

import Courier from '@models/Courier';
import Package from '@models/Package';

interface IRequest {
  courier_id: number;
  package_id: number;
  start_date: string;
}

class StartPackageDeliveryService {
  public async execute(req: IRequest): Promise<Package> {
    const { courier_id, package_id, start_date } = req;

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

    if (pkg.courier_id !== courier_id) {
      throw new AppError('This package delivery belongs to another courier');
    }

    if (pkg.start_date) {
      throw new AppError('This package delivery has already been started');
    }

    const startDateISO = parseISO(start_date);

    if (!isValid(startDateISO)) {
      throw new AppError('Invalid date');
    }

    if (isFuture(startDateISO)) {
      throw new AppError('Future dates are not allowed');
    }

    const startDateEightOClock = setSeconds(
      setMinutes(setHours(startDateISO, 8), 0),
      0,
    );
    const startDateEighteenOClock = setSeconds(
      setMinutes(setHours(startDateISO, 18), 0),
      0,
    );

    if (
      isBefore(startDateISO, startDateEightOClock) ||
      isAfter(startDateISO, startDateEighteenOClock)
    ) {
      throw new AppError(
        'The start time of package delivery has to be between 8:00 and 18:00',
      );
    }

    const startDateDayBeginning = startOfDay(startDateISO);
    const startDateDayEnd = endOfDay(startDateISO);

    const [, packagesCount] = await packageRepository.findAndCount({
      where: {
        courier_id,
        start_date: Between(startDateDayBeginning, startDateDayEnd),
      },
    });

    if (packagesCount >= 5) {
      throw new AppError(
        'The courier cannot start a package delivery more than 5 times per day',
      );
    }

    pkg.start_date = startDateISO;

    return packageRepository.save(pkg);
  }
}

export default StartPackageDeliveryService;
