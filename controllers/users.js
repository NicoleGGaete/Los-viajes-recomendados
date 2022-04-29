const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, getUserByUserName, getUserEmail } = require('../db/users');
const { genError } = require('../helpers');

const newUserCtrl = async (req, res, next) => {
  try {
    const { email, password, userName, name, surname, image, description } =
      req.body;

    console.log('Hasta aca llegamos');
    //ESTO REMPLAZAR POR JOI ESTOY EN ESO
    if (!email || !password) {
      throw genError(
        'Debe ingresar un email y un password para registrarse',
        400
      );
    }

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
    console.log(infoNewUser);
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

    if (!email || !password) {
      throw genError('Debes colocar correo y un password', 400);
    }

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
