const { getRecoId } = require('../../db/reco/getRecoId');

//Controlador ver reco por recoId
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
