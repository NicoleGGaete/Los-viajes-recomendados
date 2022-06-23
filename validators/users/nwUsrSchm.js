const Joi = require('@hapi/joi');

const nwUsrSchm = Joi.object().keys({
  email: Joi.string().email().required('email').messages({
    'string.empty': 'Debe ingresar un email',
    'string.email': 'Debe ingresar un email valido',
    'any.required': 'El email es un campo requerido',
  }),
  password1: Joi.string().min(7).required().messages({
    'string.empty': 'Debe ingresar un password',
    'string.min': 'El password debe contener al menos 7 caraceres',
    'any.required': 'El password es un campo requerido',
  }),
  password2: Joi.string().valid(Joi.ref('password1')).required().messages({
    'string.empty': 'Debe ingresar un password de confirmacion',
    'any.only':
      'El password de confirmacion tiene que coincidir con el password',
    'any.required': 'La confirmacion de password es requerida',
  }),

  userName: Joi.string().token().max(100).required().messages({
    'string.empty': 'Debe ingresar un nombre de usuario',
    'string.token':
      'El nombre de usuario debe contener solo a-z, A-Z, 0-9 y _ ',
    'string.max': 'El nombre de usuario no debe tener más de 100 caracteres',
    'any.required': 'El nombre de usuario es un campo requerido',
  }),

  avatar: Joi.string().empty(''),

  description: Joi.string().empty('').max(280).messages({
    // 'string.empty': 'Debe ingresar una descripcion',
    'string.max': 'La descripcion debe contener menos de 350 caraceres',
  }),
});

module.exports = {
  nwUsrSchm,
};
