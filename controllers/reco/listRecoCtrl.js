const { listReco } = require('../../db/reco/listReco');

//controlador busqueda por categoria y lugar, y orden por voto
const listRecoCtrl = async (req, res, next) => {
  try {
    const recos = await listReco();

    res.send({
      status: 'ok',
      data: recos,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listRecoCtrl,
};
