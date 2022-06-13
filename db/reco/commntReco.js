const { getConnection } = require('../db');

//gestion base de datos de nuevo comentario
const commentReco = async (comment, recoId, userId, replyId) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      INSERT INTO comments (userId, recoId, comment, replyId)
      VALUES (?,?,?,?)
      `,
      [userId, recoId, comment, replyId]
    );
    return result.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  commentReco,
};
