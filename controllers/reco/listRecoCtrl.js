const { listReco } = require('../../db/reco/listReco');

//controlador busqueda por categoria y lugar, y orden por voto
const listRecoCtrl = async (req, res, next) => {
  try {
    const { search, order, direction } = req.query;
    const upshot = await listReco(search, order, direction);

    res.send({ status: 'ok', data: upshot });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listRecoCtrl,
};
