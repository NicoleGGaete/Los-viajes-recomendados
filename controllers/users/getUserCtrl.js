const { getUserByUserName } = require('../../db/users/getUserByUserName');

//controlador de obtencion de user por username
const getUserCtrl = async (req, res, next) => {
  try {
    const { userName } = req.params;
    const upshot = await getUserByUserName(userName);

    res.send({
      status: 'ok',
      data: upshot,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserCtrl,
};
