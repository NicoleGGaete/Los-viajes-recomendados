const { getRecoId } = require('../../db/reco/getRecoId');

//Controlador ver reco por recoId
const getRecoCtrl = async (req, res, next) => {
  try {
    const { recoId } = req.params;
    const reco = await getRecoId(recoId);
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
