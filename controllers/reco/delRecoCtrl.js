const { delRecoId } = require('../../db/reco/delReco');
const { getRecoId } = require('../../db/reco/getRecoId');
const { genError } = require('../../helpers/helpers');

//Controlador de borrado de reco
const delRecoCtrl = async (req, res, next) => {
  try {
    const { recoId } = req.params;

    console.log(recoId);
    const reco = await getRecoId(recoId);
    console.log(recoId + 1);

    if (req.userId !== reco.userId) {
      throw await genError(
        'Estas intentando borrar una recomendacion que no te pertenece',
        401
      );
    }
    console.log(recoId + 2);

    await delRecoId(recoId);
    console.log(recoId + 3 + 'ESTO ESTA EN DELREOCCTRL');

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
