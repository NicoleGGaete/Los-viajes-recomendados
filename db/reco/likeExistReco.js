const { getConnection } = require('../db');

const likeExistReco = async (userIdLike, recoId) => {
  let connection;
  console.log('HOIAOLALALLAJLALA', recoId, userIdLike);

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

    return existLike.length > 0 ? true : false;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { likeExistReco };
