import { celebrate, Joi, Segments } from 'celebrate';

class DeliveryProblemValidator {
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
        [Segments.PARAMS]: Joi.object().keys({
          id: Joi.number().positive(),
        }),
        [Segments.BODY]: Joi.object().keys({
          courier_id: Joi.number().positive().required(),
          description: Joi.string().required(),
        }),
      },
      {
        abortEarly: false,
      },
    );

    return validator;
  }

  cancel() {
    const validator = celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().positive(),
      }),
    });

    return validator;
  }
}

export default new DeliveryProblemValidator();
