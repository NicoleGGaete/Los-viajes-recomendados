const { getConnection } = require('../db');

const likeReco = async (userIdLike, recoId) => {
  let connection;
  const like = 1;
  try {
    connection = await getConnection();

    await connection.query(
      `
      INSERT INTO likes
      (userIdLike, recoId, iLike)
      VALUES (?,?,?)
      `,
      [userIdLike, recoId, like]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { likeReco };
