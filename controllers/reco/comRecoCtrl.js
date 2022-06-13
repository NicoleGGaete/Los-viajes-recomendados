const { commentReco } = require('../../db/reco/commntReco');
const { getCommentId } = require('../../db/reco/getCommentId');
const { cmmntSchm } = require('../../validators/reco/cmmntSchm');

//Controlador de comentario
const comRecoCtrl = async (req, res, next) => {
  try {
    const { comment, recoId, replyId } = req.body;

    const userId = req.userId;
    await cmmntSchm.validateAsync({ comment });

    const commentId = await commentReco(comment, recoId, userId);

    const data = await getCommentId(commentId);
    res.send({
      status: 'ok',
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  comRecoCtrl,
};
