const { createUser } = require('../../db/users/users');
const { nwUsrSchm } = require('../../validators/users/nwUsrSchm');

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

module.exports = {
  newUserCtrl,
};
