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

  create() {
    const validator = celebrate(
      {
        [Segments.BODY]: Joi.object().keys({
          recipient_id: Joi.number().positive().required(),
          courier_id: Joi.number().positive().required(),
          product: Joi.string().required(),
        }),
      },
      {
        abortEarly: false,
      },
    );

    return validator;
  }
}

export default new PackageValidator();
