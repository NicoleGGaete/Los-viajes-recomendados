const { genError } = require('../../helpers/helpers');
const { getConnection } = require('../db');

//Info de usuario por su email
const getUserEmail = async (email) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
        SELECT * FROM users WHERE email = ?
        `,
      [email]
    );

    if (result.length === 0) {
      throw genError('No existe usuario con ese email', 404);
    }
    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getUserEmail };
