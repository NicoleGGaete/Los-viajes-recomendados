const { getConnection } = require('../db');

//listado de recomendaciones por categoria y lugar, ordenado desc o asc por fecha o por cantidad de votos

const searchReco = async (searching) => {
  let connection;

  try {
    connection = await getConnection();

    const search = searching.search;

    console.log(search);

    const [result] = await connection.query(
      `
    SELECT reco.recoId, reco.userId,
      reco.tittle, reco.image, reco.openLine,
      reco.category, reco.spot,reco.created_at,
       users.userName, users.avatar, likes.iLike
      FROM reco
      LEFT JOIN users
      ON reco.userId = users.id
      LEFT JOIN likes
      ON reco.recoId = likes.recoId
      WHERE reco.category LIKE ? 
      OR reco.spot LIKE ?
      OR users.userName LIKE ?

      GROUP BY reco.recoId, likes.iLike
      ORDER BY reco.created_at DESC
      `,
      [`${search}`, `%${search}%`, `%${search}%`]
    );

    console.log('RESULT', result[0]);

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};
module.exports = { searchReco };
