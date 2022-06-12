const { getConnection } = require('../db');

//gestion base de datos de nuevo comentario
const commentReco = async (comment, recoId, userId, replyId) => {
  console.log(comment);
  console.log(recoId);
  console.log(userId);
  console.log(replyId);

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
    console.log('result', result);
    return result.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  commentReco,
};
