const { getConnection } = require('../db');
//edit de usuario FALTA ACOMODAR ALGUNAS COSAS ROTAS
const editUser = async (id, email, userName, name, surname, description) => {
  let connection;
  try {
    connection = await getConnection();

    // if (!email) {
    //   const [userReign] = await connection.query(
    //     `
    // SELECT email, userName,name, surname, description
    // FROM users
    // WHERE id=?
    //     `,
    //     [id]
    //   );
    //   email = userReign[0].email;
    //   console.log(email);
    // }

    // await editIfExist(id, email);

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
