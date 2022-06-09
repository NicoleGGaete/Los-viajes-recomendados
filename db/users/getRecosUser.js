const { genError } = require('../../helpers/helpers');
const { getConnection } = require('../db');
//extrae de base de datos las reco de usuario logueado
const getRecosUser = async (userId) => {
  let connection;

  try {
    connection = await getConnection();

    const [recoUser] = await connection.query(
      `
        SELECT reco.tittle, reco.image, reco.category, reco.spot, reco.text, reco.created_at, users.avatar, likes.iLike
        FROM reco 
        LEFT JOIN users
        ON reco.userId = users.id
        LEFT JOIN likes
        ON users.id = likes.userId
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
