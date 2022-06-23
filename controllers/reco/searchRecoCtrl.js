const { searchReco } = require('../../db/reco/searchReco');

const searchRecoCtrl = async (req, res, next) => {
  try {
    const searching = req.query;
    const recos = await searchReco(searching);

    res.send({
      status: 'ok',
      data: recos,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  searchRecoCtrl,
};
