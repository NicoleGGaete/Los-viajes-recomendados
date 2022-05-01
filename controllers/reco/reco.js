// app.post('/reco', authUser, newRecoCtrl); //publicar reco
// const newRecoCtrl = async (req, res, next) => {
//   try {
//     res.send({
//       status: 'error',
//       message: 'aun no implementado',
//     });
//   } catch (error) {
//     next(error);
//   }
// };
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
  // newRecoCtrl,

  voteRecoCtrl,
  delRecoCtrl,
};
