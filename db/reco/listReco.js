const { getConnection } = require('../db');

//listado de recomendaciones por categoria y lugar, ordenado desc o asc por fecha o por cantidad de votos
const listReco = async () => {
  let connection;

  try {
    connection = await getConnection();

    const [upshot] = await connection.query(
      `
  
            SELECT reco.recoId, reco.userId,
            reco.tittle, reco.image, reco.openLine,
            reco.category, reco.spot, users.userName, users.avatar, likes.iLike
            FROM reco
            LEFT JOIN users
            ON reco.userId = users.id 
            LEFT JOIN likes
            ON users.id = likes.userId
            ORDER BY reco.created_at DESC
            
            `
    );

    return upshot;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { listReco };
