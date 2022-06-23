const { editUser } = require('../../db/users/editUser');
const { edtUsrSchm } = require('../../validators/users/edtUsrSchm');

//controlador de edicion de usuario

const editUserCtrl = async (req, res, next) => {
  try {
    const { email, userName, description } = req.body;
    const { id } = req.userId;

    edtUsrSchm.validate(email, userName, description);

    await editUser(id, email, userName, description);

    res.send({
      status: 'Ok',
      message: 'Informacion de usuario actualizada',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  editUserCtrl,
};
