const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserEmail } = require('../../db/users/getUserEmail');
const { genError } = require('../../helpers/helpers');
const { lgnSchm } = require('../../validators/users/lgnSchm');

//controlador login
const loginCtrl = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await lgnSchm.validateAsync(req.body);

    //busco en base de datos
    const user = await getUserEmail(email);

    //comprobar pass
    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      throw await genError('La contraseña no coincide', 401);
    }

    //payload token
    const payload = { id: user.id };

    //firmotoken
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: '7d',
    });

    //envio token
    res.send({
      status: 'ok',
      data: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginCtrl,
};
