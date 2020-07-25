import path from 'path';

import { celebrate, Joi, Segments, CelebrateError } from 'celebrate';
import { Request, Response, NextFunction } from 'express';

import deleteFile from '@utils/deleteFile';

import { uploadsDir } from '@config/upload';

class CourierValidator {
  show() {
    const validator = celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().positive(),
      }),
    });

    return validator;
  }

  create() {
    const validator = async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      try {
        const schema = Joi.object().keys({
          name: Joi.string().required(),
          email: Joi.string().email().required(),
        });

        await schema.validateAsync(req.body, { abortEarly: false });

        return next();
      } catch (err) {
        if (req.file) {
          await deleteFile(path.resolve(uploadsDir, req.file.filename));
        }

        throw CelebrateError(err, Segments.BODY, { celebrated: true });
      }
    };

    return validator;
  }
}

export default new CourierValidator();
