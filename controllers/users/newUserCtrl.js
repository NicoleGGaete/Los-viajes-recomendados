const { createUser } = require('../../db/users/createUser');
const { genError, createPathIfNot } = require('../../helpers/helpers');
const { nwUsrSchm } = require('../../validators/users/nwUsrSchm');
const path = require('path');
const { nanoid } = require('nanoid');
const sharp = require('sharp');

//controlador new user
const newUserCtrl = async (req, res, next) => {
  try {
    await nwUsrSchm.validateAsync(req.body);
    const { email, password1, userName, description } = req.body;
    let avatarUp;

    if (req.files && req.files.avatar) {
      const uploadsDir = path.join(__dirname, '../../uploads');

      await createPathIfNot(uploadsDir);

      const image = sharp(req.files.avatar.data);
      image.resize(150);

      avatarUp = `${nanoid(24)}.webp`;
      await image.toFile(path.join(uploadsDir, avatarUp));
    }
    const infoNewUser = await createUser(
      email,
      password1,
      userName,

      avatarUp,
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
