const { getUserById } = require('../../db/users/getUserById');

const getMeCtrl = async (req, res, next) => {
  try {
    const user = await getUserById(req.userId, false);

    res.send({
      status: 'ok',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMeCtrl };
