const { getConnection } = require('../db');

const booleanButton = async (recoId, userIdLike) => {
  let connection;

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
    console.log('parametros booleanbutton', recoId, userIdLike);

    console.log('booleanButton', booleanButto[0]);

    // if (booleanButton.length > 0) return true;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { booleanButton };
