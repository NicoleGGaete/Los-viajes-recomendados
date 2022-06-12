const { listComments } = require('../../db/reco/listComments');

const listComRecoCtrl = async (req, res, next) => {
  try {
    const recoId = req.params;
    console.log(recoId);
    const listCmmnts = await listComments(recoId);

    res.send({
      status: 'ok',
      data: listCmmnts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { listComRecoCtrl };
