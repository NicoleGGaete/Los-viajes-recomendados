const { delRecoId } = require('../../db/reco/delReco');
const { getRecoId } = require('../../db/reco/getRecoId');
const { genError } = require('../../helpers/helpers');

//Controlador de borrado de reco
const delRecoCtrl = async (req, res, next) => {
  try {
    const { recoId } = req.params;

    const reco = await getRecoId(recoId);

    if (req.userId !== reco.userId) {
      throw await genError(
        'Estas intentando borrar una recomendacion que no te pertenece',
        401
      );
    }

    await delRecoId(recoId);

    res.send({
      status: 'ok',
      message: 'La recomendacion fue eliminada',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  delRecoCtrl,
};
