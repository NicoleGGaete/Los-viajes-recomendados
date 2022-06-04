const { createUser } = require('../../db/users/createUser');
const { genError } = require('../../helpers/helpers');
const { nwUsrSchm } = require('../../validators/users/nwUsrSchm');

//controlador new user
const newUserCtrl = async (req, res, next) => {
  try {
    await nwUsrSchm.validateAsync(req.body);
    const { email, password1, userName, name, surname, description } = req.body;

    const image = req.files;

    const infoNewUser = await createUser(
      email,
      password1,
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
    next(await genError(error));
  }
};

module.exports = {
  newUserCtrl,
};
