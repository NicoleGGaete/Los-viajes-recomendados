const Joi = require('@hapi/joi');

const nwRcSchm = Joi.object().keys({
  tittle: Joi.string().required().messages({
    'string.empty': 'Debe ingresar un titulo',
    'any.required': 'El "tittle" es un campo requerido',
  }),

  image: Joi.string().empty(''),

  category: Joi.string().max(100).required().messages({
    'string.empty': 'Debe ingresar una categoria',
    'string.max': 'La categoria no debe tener más de 100 caracteres',
    'any.required': 'La "category" es un campo requerido',
  }),

  spot: Joi.string().max(100).required().messages({
    'string.empty': 'Debe ingresar un lugar',
    'string.max': 'El lugar debe contener menos de 100 caraceres',
    'any.required': 'El "spot" un campo requerido',
  }),

  openLine: Joi.string().max(100).required().messages({
    'string.empty': 'Debe ingresar una entradilla',
    'string.max': 'La entradilla debe contener menos de 100 caraceres',
    'any.required': 'El "openLine" es un campo requerido',
  }),

  text: Joi.string().max(360).required().messages({
    'string.empty': 'Debe ingresar un texto de recomendacion',
    'string.max':
      'El texto de recomendacion debe contener menos de 360 caraceres',
    'any.required': 'El "text" es un campo requerido',
  }),
});

module.exports = {
  nwRcSchm,
};
