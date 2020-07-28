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
}

export default new CourierPackageValidator();
