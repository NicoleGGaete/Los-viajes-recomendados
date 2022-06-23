const { dislikeReco } = require('../../db/reco/dislikeReco');

const disLikeRecoCtrl = async (req, res, next) => {
  try {
    const recoId = req.params.recoId;
    const userIdLike = req.userId;
    const data = await dislikeReco(userIdLike, recoId);

    res.send({
      status: 'ok',
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { disLikeRecoCtrl };
