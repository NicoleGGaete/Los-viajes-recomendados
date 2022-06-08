const { getRecosUser } = require('../../db/users/getRecosUser');

const getRecosUserCtrl = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const recos = await getRecosUser(userId);

    res.send({
      status: 'ok',
      data: recos,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getRecosUserCtrl };
