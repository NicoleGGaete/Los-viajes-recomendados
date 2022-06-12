const { commentReco } = require('../../db/reco/commntReco');
const { getCommentId } = require('../../db/reco/getCommentId');
const { cmmntSchm } = require('../../validators/reco/cmmntSchm');

//Controlador de comentario
const comRecoCtrl = async (req, res, next) => {
  try {
    const { comment, recoId, replyId } = req.body;
    console.log(comment);
    console.log(recoId);
    console.log(replyId);

    const userId = req.userId;
    console.log(userId);
    await cmmntSchm.validateAsync({ comment });

    const commentId = await commentReco(comment, recoId, userId);

    console.log('coso', commentId);

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
