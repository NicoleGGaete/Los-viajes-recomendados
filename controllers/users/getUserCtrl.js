const { getUserByUserName } = require('../../db/users/users');

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

module.exports = {
  getUserCtrl,
};
