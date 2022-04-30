const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, getUserByUserName, getUserEmail } = require('../db/users');
const { genError } = require('../helpers');
const { nwUsrSchm, lgnSchm } = require('../validators/userValidators');

const newUserCtrl = async (req, res, next) => {
  try {
    const { email, password, userName, name, surname, image, description } =
      req.body;

    await nwUsrSchm.validateAsync(req.body);

    const infoNewUser = await createUser(
      email,
      password,
      userName,
      name,
      surname,
      image,
      description
    );

    res.send({
      status: 'ok',
      message: `User creado exitosamente con ID:${infoNewUser}`,
    });
  } catch (error) {
    next(error);
  }
};

const getUserCtrl = async (req, res, next) => {
  try {
    const { userName } = req.params;

    const user = await getUserByUserName(userName);

    res.send({
      status: 'ok',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const loginCtrl = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await lgnSchm.validateAsync(req.body);

    //busco en base de datos
    const user = await getUserEmail(email);

    //comprobar pass
    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      throw genError('La contraseña no coincide', 401);
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
  newUserCtrl,
  getUserCtrl,
  loginCtrl,
};
