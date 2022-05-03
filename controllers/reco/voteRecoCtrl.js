const { voteReco } = require('../../db/reco/voteReco');
const { vtSchm } = require('../../validators/reco/vtSchm');

// controlador voto recomendacion por ID
const voteRecoCtrl = async (req, res, next) => {
  try {
    console.log('ERRRRORRRR');

    const { recoId } = req.params;

    const userId = req.userId;

    const { vote } = req.body;

    await vtSchm.validateAsync(req.body);

    await voteReco(recoId, userId, vote);

    res.send({
      status: 'ok',
      message: 'Voto realizado',
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  // newRecoCtrl,

  voteRecoCtrl,
};
