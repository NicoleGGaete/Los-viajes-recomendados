const { genError } = require('../../helpers/helpers');
const { getConnection } = require('../db');
//extrae de base de datos las reco de usuario logueado
const getRecosUser = async (userId) => {
  let connection;

  try {
    connection = await getConnection();

    const [recoUser] = await connection.query(
      `
        SELECT reco.recoId, reco.tittle, reco.image, reco.openLine, 
        reco.category, reco.spot, reco.text, reco.userId, reco.created_at, 
        users.avatar, users.userName, likes.iLike
        FROM reco 
        LEFT JOIN users
        ON reco.userId = users.id
        LEFT JOIN likes
        ON reco.recoId = likes.recoId
        WHERE users.id = ?
        `,
      [userId]
    );
    if (recoUser.length === 0) {
      throw await genError('El usuario no tiene aun recomendaciones', 404);
    }
    return recoUser;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getRecosUser };
