const { getConnection } = require('../db');

const dislikeReco = async (userIdLike, recoId) => {
  let connection;
  try {
    connection = await getConnection();

    const delet = await connection.query(
      `
      DELETE FROM likes
      WHERE userIdLike = ?
      AND recoId = ?
      `,
      [userIdLike, recoId]
    );
    return delet[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { dislikeReco };
