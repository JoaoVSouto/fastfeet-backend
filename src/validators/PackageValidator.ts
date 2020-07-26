import { celebrate, Joi, Segments } from 'celebrate';

class PackageValidator {
  show() {
    const validator = celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().positive(),
      }),
    });

    return validator;
  }
}

export default new PackageValidator();
