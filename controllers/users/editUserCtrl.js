const { editUser } = require('../../db/users/editUser');
const { editIfExist } = require('../../helpers/editIfExist');
const { edtUsrSchm } = require('../../validators/users/edtUsrSchm');

const editUserCtrl = async (req, res, next) => {
  try {
    const { email, userName, name, surname, description } = req.body;
    const { id } = req.userId;

    edtUsrSchm.validate(email, userName, name, surname, description);

    await editUser(id, email, userName, name, surname, description);

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
