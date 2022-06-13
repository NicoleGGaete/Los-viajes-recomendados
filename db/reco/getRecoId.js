const { genError } = require('../../helpers/helpers');
const { getConnection } = require('../db');

//obtencion de reco por recoId
const getRecoId = async (recoId) => {
  let connection;
  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
        SELECT reco.recoId, reco.userId, reco.tittle, 
        reco.image, reco.spot, reco.category,
         reco.openLine, reco.text, reco.created_at,
         users.userName, users.avatar,
          likes.iLike  FROM reco
        LEFT JOIN users
        ON users.id = reco.userId
        LEFT JOIN likes
        ON likes.recoId = reco.userId
        WHERE reco.recoId = ?
        
        `,
      [recoId]
    );
    if (result.length === 0) {
      throw await genError(
        `La recomendacion con el ID: ${recoId} no existe`,
        404
      );
    }
    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getRecoId };
