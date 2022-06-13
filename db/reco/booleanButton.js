const { getConnection } = require('../db');

const booleanButton = async (recoId, userIdLike) => {
  let connection;
  ///ELIMINAR COMPLETAMENTE ESTE ARCHIVO
  try {
    connection = await getConnection();
    const [booleanButto] = await connection.query(
      `
        SELECT likeId
        FROM likes
        WHERE recoId = ?
        AND userIdLike = ?
        `,
      [recoId, userIdLike]
    );

    // if (booleanButton.length > 0) return true;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { booleanButton };
