const { genError } = require('../../helpers/helpers');
const { getConnection } = require('../db');

//Info de un usuario por su username
const getUserByUserName = async (userName) => {
  let connection;
  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
        SELECT created_at, userName,  image, description FROM users WHERE userName = ?
        `,
      [userName]
    );
    if (result.length === 0) {
      throw await genError('El nombre no existe como usuario', 404);
    }
    return result;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getUserByUserName };
