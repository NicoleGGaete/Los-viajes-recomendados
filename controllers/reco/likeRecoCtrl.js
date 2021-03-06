const { likeReco } = require('../../db/reco/likeReco');

const likeRecoCtrl = async (req, res, next) => {
  try {
    const { recoId } = req.params;
    const userIdLike = req.userId;
    await likeReco(userIdLike, recoId);
    res.send({
      status: 'ok',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { likeRecoCtrl };
