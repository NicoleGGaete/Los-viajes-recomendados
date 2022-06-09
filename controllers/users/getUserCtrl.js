const { getUserId } = require('../../db/users/getUserId');

//controlador de obtencion de user por username
const getUserCtrl = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const upshot = await getUserId(userId);

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
