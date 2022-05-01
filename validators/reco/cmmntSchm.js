const Joi = require('@hapi/joi');

const cmmntSchm = Joi.object({
  comments: Joi.string().min(20).max(300).required().messages({
    'string.empty': 'Debe ingresar un commentario',
    'strting.min': 'El comentario debe tener al menos 20 caracteres',
    'string.max': 'El comentario no puede exceder los 300 caracteres',
    'any.required': '"comments" es una key requerida',
  }),
});

module.exports = {
  cmmntSchm,
};
