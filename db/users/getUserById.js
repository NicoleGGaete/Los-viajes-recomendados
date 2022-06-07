const { genError } = require('../../helpers/helpers');
const { getConnection } = require('../db');

const getUserById = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
            SELECT id, email, created_at, userName, description FROM users WHERE id = ?
          `,
      [id]
    );
    if (result.length === 0) {
      throw genError('No hay ningun usuario con esa ID', 404);
    }
    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getUserById };
