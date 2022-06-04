const { result } = require('@hapi/joi/lib/base');
const { genError } = require('../../helpers/helpers');

const getUserById = async (id, includeRecos = true) => {
  let connection;
  try {
    connection = await connection.query(
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
