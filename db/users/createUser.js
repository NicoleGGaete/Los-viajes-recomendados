const bcrypt = require('bcrypt');
const { genError } = require('../../helpers/helpers');
const { getConnection } = require('../db');

//Creacion del usuario en la base de datos
const createUser = async (email, password1, userName, avatar, description) => {
  let connection;

  try {
    connection = await getConnection();
    //comprobamos elusuario por email
    const [userReign] = await connection.query(
      `
        SELECT id FROM users WHERE email = ?
        `,
      [email]
    );
    if (userReign.length > 0) {
      throw await genError(
        'El correo electronico ya esta asignado a un usuario',
        400
      );
    }

    //encriptamos
    const passHash = await bcrypt.hash(password1, 8);
    //creamos usuario
    const [newUser] = await connection.query(
      `
        INSERT INTO users (email, password, userName,  avatar, description) VALUES (?,?,?,?,?)
        `,
      [email, passHash, userName, avatar, description]
    );

    //devuelvbe la id
    return newUser.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { createUser };
