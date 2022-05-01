const { listReco } = require('../../db/reco/listReco');

// app.get('/reco', listRecoCtrl); //ver listado de todas las reco (userId, tittle, image, category, spot, openLine), se puede incluir aca la buscqueda por categoria, lugar y votos
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
