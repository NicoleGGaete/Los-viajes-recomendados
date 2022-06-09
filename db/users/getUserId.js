const { genError } = require('../../helpers/helpers');
const { getConnection } = require('../db');

//Info de un usuario por su ID
const getUserId = async (userId) => {
  let connection;
  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
        SELECT id, created_at, userName,  avatar, email, name, surname, description, role FROM users WHERE id = ?
        `,
      [userId]
    );
    if (result.length === 0) {
      throw await genError('El nombre no existe como usuario', 404);
    }
    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getUserId };
