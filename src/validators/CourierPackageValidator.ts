import { celebrate, Joi, Segments } from 'celebrate';

class CourierPackageValidator {
  list() {
    const validator = celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().positive(),
      }),
    });

    return validator;
  }
}

export default new CourierPackageValidator();
