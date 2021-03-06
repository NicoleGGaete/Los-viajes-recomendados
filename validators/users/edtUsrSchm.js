const Joi = require('@hapi/joi');

const edtUsrSchm = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Debe ingresar un email',
    'string.email': 'Debe ingresar un email valido',
    'any.required': 'El email es un campo requerido',
  }),

  userName: Joi.string().token().max(100).required().messages({
    'string.empty': 'Debe ingresar un nombre de usuario',
    'string.token': 'Debe contener solo a-z, A-Z, 0-9 y _ ',
    'string.max': 'El nombre de usuario no debe tener más de 100 caracteres',
    'any.required': 'El userName es un campo requerido',
  }),

  description: Joi.string().max(280).required().messages({
    'string.empty': 'Debe ingresar una descripcion',
    'string.max': 'La descripcion debe contener menos de 280 caraceres',
    'any.required': 'La descripcion es un campo requerido',
  }),
});

module.exports = {
  edtUsrSchm,
};
