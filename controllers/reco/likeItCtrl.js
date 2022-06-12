const { likeReco } = require('../../db/reco/likeReco');
// const { booleanButton } = require('../../db/reco/booleanButton');

const { likeExistReco } = require('../../db/reco/likeExistReco');
const { dislikeReco } = require('../../db/reco/dislikeReco');

const likeItCtrl = async (req, res, next) => {
  try {
    const { recoId } = req.params;
    const userIdLike = req.userId;
    // const booleanB = await booleanButton(userIdLike, recoId);

    const booleanB = await likeExistReco(userIdLike, recoId);
    // if (booleanB != true) await likeReco(userIdLike, recoId);

    // booleanB !== false
    //   ? await likeReco(userIdLike, recoId)
    //   : await dislikeReco(userIdLike, recoId);

    console.log('BOOOOOOLEAN ', booleanB);

    res.send({
      status: 'ok',
      data: booleanB,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { likeItCtrl };
