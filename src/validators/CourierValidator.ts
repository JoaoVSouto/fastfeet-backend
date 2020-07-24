import { celebrate, Joi, Segments } from 'celebrate';

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
    const validator = celebrate(
      {
        [Segments.BODY]: Joi.object().keys({
          name: Joi.string().required(),
          email: Joi.string().email().required(),
        }),
      },
      {
        abortEarly: false,
      },
    );

    return validator;
  }
}

export default new CourierValidator();
