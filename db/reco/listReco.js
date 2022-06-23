const { getConnection } = require('../db');

//listado de recomendaciones por categoria y lugar, ordenado desc o asc por fecha o por cantidad de votos
const listReco = async (direction, order) => {
  let connection;
  const orderDir =
    (direction && direction.toLowerCase()) === 'asc' ? 'ASC' : 'DESC';

  let orderBy;
  switch (order) {
    case 'likes':
      orderBy = 'vote';
      break;
    default:
      orderBy = 'created_at';
  }

  try {
    connection = await getConnection();

    const [upshot] = await connection.query(
      `
      SELECT reco.recoId, reco.userId, 
      reco.tittle, reco.image, reco.openLine,
      reco.category, reco.spot, reco.created_at, reco.text,
      users.userName, users.avatar, 
      (SELECT COUNT (likes.iLike) FROM likes WHERE likes.recoId = reco.recoId) AS iLike
      FROM reco
      LEFT JOIN users
      ON reco.userId = users.id 
      ORDER BY ${orderBy} ${orderDir}`
    );
    // GROUP BY reco.recoId, likes.iLike

    // console.log(upshot);
    return upshot;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { listReco };

// const [upshot] = await connection.query(
//   `
//       SELECT reco.recoId, reco.userId,
//       reco.tittle, reco.image, reco.openLine,
//       reco.category, reco.spot, users.userName, users.avatar, likes.iLike
//       FROM reco
//       LEFT JOIN users
//       ON reco.userId = users.id
//       LEFT JOIN likes
//       ON reco.recoId = likes.recoId
//       GROUP BY reco.recoId, likes.iLike
//       ORDER BY reco.created_at DESC

//             `
// );
