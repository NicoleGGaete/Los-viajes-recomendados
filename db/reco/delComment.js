const { getConnection } = require('../db');

const delComment = async (commntId) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query(
      `
    DELETE FROM comments WHERE cmmntId = ?
            `,
      [commntId]
    );

    return;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { delComment };
