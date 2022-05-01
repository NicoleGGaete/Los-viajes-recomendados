const { getRecoId } = require('../../db/reco');

// app.get('/reco/:id', getRecoCtrl); //ver el detalle de una reco por ID
const getRecoCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reco = await getRecoId(id);

    res.send({
      status: 'ok',
      data: reco,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRecoCtrl,
};
