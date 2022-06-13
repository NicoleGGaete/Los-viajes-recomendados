const { getConnection } = require('../db');

const dislikeReco = async (userIdLike, recoId) => {
  let connection;
  try {
    connection = await getConnection();

    await connection.query(
      `
      DELETE FROM likes
      WHERE userIdLike = ?
      AND recoId = ?
      `,
      [userIdLike, recoId]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { dislikeReco };
