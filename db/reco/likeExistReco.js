const { getConnection } = require('../db');

const likeExistReco = async (userIdLike, recoId) => {
  let connection;

  try {
    connection = await getConnection();

    const [existLike] = await connection.query(
      `
      SELECT likeId 
      FROM likes
      WHERE recoId = ?
      AND userIdLike = ?
      `,
      [recoId, userIdLike]
    );

    console.log('HOLA', existLike.length);
    return existLike.length > 0 ? true : false;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { likeExistReco };
