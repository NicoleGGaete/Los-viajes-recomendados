const { getConnection } = require('../db');

const commentReco = async (userId, idReco, cmmnt) => {
  let connection;
  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      INSERT INTO comments (userId, recoId, comment)
      VALUES (?,?,?)
      `,
      [userId, idReco, cmmnt]
    );

    return result;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  commentReco,
};
