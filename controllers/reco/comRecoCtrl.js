const { commentReco } = require('../../db/reco/commntReco');
const { cmmntSchm } = require('../../validators/reco/cmmntSchm');

//Controlador de comentario
const comRecoCtrl = async (req, res, next) => {
  try {
    const idUser = req.userId;
    const { comments } = req.body;
    const idReco = req.params.recoId;
    //ID
    await cmmntSchm.validateAsync(req.body);
    commentReco(idUser, idReco, comments);
    res.send({
      status: 'ok',
      message: `Fue publicado en la reco ${idReco}
        el siguiente comentario
     ${comments}  `,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  comRecoCtrl,
};
