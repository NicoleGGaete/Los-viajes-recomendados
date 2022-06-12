const Joi = require('@hapi/joi');

const cmmntSchm = Joi.object({
  comment: Joi.string().max(300).required().messages({
    'string.empty': 'Debe ingresar un commentario',
    'string.max': 'El comentario no puede exceder los 300 caracteres',
    'any.required': '"comments" es una key requerida',
  }),
});

module.exports = {
  cmmntSchm,
};
