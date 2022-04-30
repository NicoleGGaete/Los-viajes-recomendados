const Joi = require('@hapi/joi');

const nwUsrSchm = Joi.object({
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
  confirmPas: Joi.string().valid(Joi.ref('password')).required().messages({
    'string.empty': 'Debe ingresar un password de confirmacion',
    'any.only':
      'El password de confirmacion tiene que coincidir con el password',
    'any.required': 'El password de confirmacion es un campo requerido',
  }),

  userName: Joi.string().token().max(100).required().messages({
    'string.empty': 'Debe ingresar un nombre de usuario',
    'string.token': 'Debe contener solo a-z, A-Z, 0-9 y _ ',
    'string.max': 'El nombre de usuario no debe tener más de 100 caracteres',
    'any.required': 'El nombre de usuario es un campo requerido',
  }),

  name: Joi.string().max(100).required().messages({
    'string.empty': 'Debe ingresar un nombre',
    'string.max': 'El nombre debe contener menos de 100 caraceres',
    'any.required': 'El nombre  es un campo requerido',
  }),

  surname: Joi.string().max(100).required().messages({
    'string.empty': 'Debe ingresar un apellido',
    'string.max': 'El apellido debe contener menos de 100 caraceres',
    'any.required': 'El apellido de usuario es un campo requerido',
  }),

  description: Joi.string().max(280).messages({
    'string.empty': 'Debe ingresar una descripcion',
    'string.max': 'La descripcion debe contener menos de 280 caraceres',
  }),
});

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
  nwUsrSchm,
  lgnSchm,
};
