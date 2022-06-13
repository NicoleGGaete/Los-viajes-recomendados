const { delComment } = require('../../db/reco/delComment');
const { getCommentId } = require('../../db/reco/getCommentId');
const { genError } = require('../../helpers/helpers');

const delComRecoCtrl = async (req, res, next) => {
  try {
    const commentId = req.params.commntId;
    const comment = await getCommentId(commentId);
    if (req.userId !== comment.userId) {
      throw await genError(
        'Estas intentando eliminar un comentario que no fue realizado por tu usuario',
        401
      );
    }

    await delComment(comment.cmmntId);

    res.send({
      status: 'ok',
      message: 'El comentario fue eliminado con exito',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  delComRecoCtrl,
};
