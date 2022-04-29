// app.post('/reco', authUser, newRecoCtrl); //publicar reco
const newRecoCtrl = async (req, res, next) => {};
// app.get('/reco', listRecoCtrl); //ver listado de todas las reco (userId, tittle, image, category, spot, openLine), se puede incluir aca la buscqueda por categoria, lugar y votos
const listRecoCtrl = async (req, res, next) => {};
// app.get('/reco/:id', getRecoCtrl); //ver el detalle de una reco por ID
const getRecoCtrl = async (req, res, next) => {};
// app.post('/reco/:id/votes', authUser, voteRecoCtrl); //voto recomendacion por ID
const voteRecoCtrl = async (req, res, next) => {};
// app.delete('/reco/:id', authUser, delRecoCtrl); //eliminar una reco
const delRecoCtrl = async (req, res, next) => {};

module.exports = {
  newRecoCtrl,
  listRecoCtrl,
  getRecoCtrl,
  voteRecoCtrl,
  delRecoCtrl,
};
