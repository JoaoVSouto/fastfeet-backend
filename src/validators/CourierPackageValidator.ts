import path from 'path';

import { celebrate, Joi, Segments, CelebrateError } from 'celebrate';
import { Request, Response, NextFunction } from 'express';

import deleteFile from '@utils/deleteFile';

import { uploadsDir } from '@config/upload';

class CourierPackageValidator {
  list() {
    const validator = celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().positive(),
      }),
    });

    return validator;
  }

  startPackageDelivery() {
    const validator = celebrate(
      {
        [Segments.PARAMS]: Joi.object().keys({
          id: Joi.number().positive(),
        }),
        [Segments.BODY]: Joi.object().keys({
          package_id: Joi.number().positive().required(),
          start_date: Joi.string().isoDate().required(),
        }),
      },
      {
        abortEarly: false,
      },
    );

    return validator;
  }

  endPackageDelivery() {
    const validator = async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      try {
        const bodySchema = Joi.object().keys({
          package_id: Joi.number().positive().required(),
          end_date: Joi.string().isoDate().required(),
        });

        await bodySchema.validateAsync(req.body, { abortEarly: false });

        const paramsSchema = Joi.object().keys({
          id: Joi.number().positive(),
        });

        await paramsSchema.validateAsync(req.params);

        return next();
      } catch (err) {
        if (req.file) {
          await deleteFile(path.resolve(uploadsDir, req.file.filename));
        }

        const [errorPath] = err.details[0].path;

        const isIdError = errorPath === 'id';

        throw CelebrateError(err, Segments[isIdError ? 'PARAMS' : 'BODY'], {
          celebrated: true,
        });
      }
    };

    return validator;
  }
}

export default new CourierPackageValidator();
