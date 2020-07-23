import { celebrate, Joi, Segments } from 'celebrate';

class RecipientValidator {
  create() {
    const validator = celebrate(
      {
        [Segments.BODY]: Joi.object().keys({
          name: Joi.string().required(),
          address_street: Joi.string().required(),
          address_number: Joi.number().positive().required(),
          address_complement: Joi.string(),
          address_cep: Joi.string()
            .length(8)
            .regex(/^[0-9]+$/)
            .required(),
          uf: Joi.string().length(2).required(),
          city: Joi.string().required(),
        }),
      },
      {
        abortEarly: false,
      },
    );

    return validator;
  }
}

export default new RecipientValidator();
