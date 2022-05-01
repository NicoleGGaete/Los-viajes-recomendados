const jwt = require('jsonwebtoken');
const { genError } = require('../helpers');

const authUser = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw genError('Falta cabecera de autorizacion', 401);
    }

    let token;
    try {
      token = jwt.verify(authorization, process.env.SECRET);
    } catch {
      throw genError('Token incorrecto', 401);
    }

    req.userId = token.id;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authUser,
};
