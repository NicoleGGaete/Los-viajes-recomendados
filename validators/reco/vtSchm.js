const Joi = require('joi');

const vtSchm = Joi.object().keys({
  vote: Joi.number().min(1).max(5).required().messages({
    'number.empty': 'Debe ingresar un voto',
    'number.min': 'El voto minimo es 1',
    'number.max': 'El voto maximo es 5',
    'any.required': ' "vote" es un campo requerido',
  }),
});

module.exports = {
  vtSchm,
};
