const { getConnection } = require('../db');

const createReco = async (userId, tittle, category, spot, openLine, text) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
        INSERT INTO reco (userId, tittle, category, spot, openLine, text)
        VALUES (?,?,?,?,?,?)
        `,
      [userId, tittle, category, spot, openLine, text]
    );
    return result.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createReco,
};
