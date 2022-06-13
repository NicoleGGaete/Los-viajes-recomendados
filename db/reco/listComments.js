const { getConnection } = require('../db');

const listComments = async ({ recoId }) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `SELECT comments.cmmntId, comments.recoId, comments.userId,
       comments.comment, comments.created_at, 
users.userName, users.avatar
FROM comments
LEFT JOIN users
ON userId = users.id
WHERE recoId = ? 
ORDER BY comments.created_at ASC
`,
      [recoId]
    );
    return result;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  listComments,
};
