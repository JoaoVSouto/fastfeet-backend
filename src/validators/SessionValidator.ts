import { celebrate, Joi, Segments } from 'celebrate';

class SessionValidator {
  create() {
    const validator = celebrate(
      {
        [Segments.BODY]: Joi.object().keys({
          email: Joi.string().email().required(),
          password: Joi.string().required(),
        }),
      },
      {
        abortEarly: false,
      },
    );

    return validator;
  }
}

export default new SessionValidator();
