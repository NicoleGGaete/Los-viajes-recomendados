const { likeExistReco } = require('../../db/reco/likeExistReco');

const likeExistCtrl = async (req, res, next) => {
  try {
    const { recoId } = req.params;
    const userIdLike = req.userId;
    console.log('hola', userIdLike, recoId);

    const booleanB = await likeExistReco(userIdLike, recoId);

    res.send({
      status: 'ok',
      data: booleanB,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { likeExistCtrl };
