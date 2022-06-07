const { genError } = require('../../helpers/helpers');
const { getConnection } = require('../db');

//obtencion de reco por recoId
const getRecoId = async (recoId) => {
  let connection;
  try {
    connection = await getConnection();
    console.log(recoId);
    const [result] = await connection.query(
      `
        SELECT * FROM reco
        JOIN users
        ON users.id = reco.userId
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
