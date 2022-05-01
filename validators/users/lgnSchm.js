const Joi = require('@hapi/joi');

const lgnSchm = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Debe ingresar un email',
    'string.email': 'Debe ingresar un email valido',
    'any.required': 'El email es un campo requerido',
  }),

  password: Joi.string().min(7).required().messages({
    'string.empty': 'Debe ingresar un password',
    'string.min': 'El password debe contener al menos 7 caraceres',
    'any.required': 'El password es un campo requerido',
  }),
});

module.exports = {
  lgnSchm,
};
