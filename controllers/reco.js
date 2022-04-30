const { listReco } = require('../db/reco');

// app.post('/reco', authUser, newRecoCtrl); //publicar reco
const newRecoCtrl = async (req, res, next) => {
  try {
    res.send({
      status: 'error',
      message: 'aun no implementado',
    });
  } catch (error) {
    next(error);
  }
};
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
// app.get('/reco/:id', getRecoCtrl); //ver el detalle de una reco por ID
const getRecoCtrl = async (req, res, next) => {
  try {
    res.send({
      status: 'error',
      message: 'aun no implementado',
    });
  } catch (error) {
    next(error);
  }
};
// app.post('/reco/:id/votes', authUser, voteRecoCtrl); //voto recomendacion por ID
const voteRecoCtrl = async (req, res, next) => {
  try {
    res.send({
      status: 'error',
      message: 'aun no implementado',
    });
  } catch (error) {
    next(error);
  }
};
// app.delete('/reco/:id', authUser, delRecoCtrl); //eliminar una reco
const delRecoCtrl = async (req, res, next) => {
  try {
    res.send({
      status: 'error',
      message: 'aun no implementado',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newRecoCtrl,
  listRecoCtrl,
  getRecoCtrl,
  voteRecoCtrl,
  delRecoCtrl,
};
