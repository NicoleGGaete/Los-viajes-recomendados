const { getConnection } = require('../db');

//creacion de reco de usario en base de datos
const createReco = async (
  userId,
  tittle,
  category,
  spot,
  openLine,
  text,
  imageFileName
) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
        INSERT INTO reco (userId, tittle, category, spot, openLine, text, image)
        VALUES (?,?,?,?,?,?,?)
        `,
      [userId, tittle, category, spot, openLine, text, imageFileName]
    );
    return result.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createReco,
};
