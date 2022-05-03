const { getConnection } = require('../db');

const delRecoId = async (recoId) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query(
      `
        DELETE FROM reco WHERE recoId = ?
        `,
      [recoId]
    );

    return;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  delRecoId,
};
