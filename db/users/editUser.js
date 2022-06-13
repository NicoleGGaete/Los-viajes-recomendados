const { getConnection } = require('../db');
//edit de usuario FALTA ACOMODAR ALGUNAS COSAS ROTAS
const editUser = async (id, email, userName, name, surname, description) => {
  let connection;
  try {
    connection = await getConnection();

    await connection.query(
      `
      UPDATE users
      SET email=?, userName=?, name=?, surname=?, description=?
      WHERE id=?
      `,
      [email, userName, name, surname, description, id]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { editUser };
