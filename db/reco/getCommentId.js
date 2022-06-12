const { genError } = require('../../helpers/helpers');
const { getConnection } = require('../db');

const getCommentId = async (commentId) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
            SELECT comments.cmmntId, comments.recoId, 
            comments.comment, comments.created_at,
            users.userName, users.avatar
            FROM comments
            LEFT JOIN users
            ON userId = users.id
            WHERE comments.cmmntId = ?
          `,
      [commentId]
    );
    if (result.length === 0) {
      throw await genError(
        `El comentario con el ID: ${commentId} no existe`,
        404
      );
    }
    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getCommentId };
