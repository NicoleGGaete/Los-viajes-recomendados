const bcrypt = require('bcrypt');
const { genError } = require('../helpers');
const { getConnection } = require('./db');

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
    console.log(result);
    return result;
  } finally {
    if (connection) connection.release();
  }
};

const createUser = async (
  email,
  password,
  userName,
  name,
  surname,
  image = '',
  description
) => {
  let connection;
  try {
    connection = await getConnection();
    //comprobamos elusuario por email
    const [user] = await connection.query(
      `
        SELECT id FROM users WHERE email = ?
        `,
      [email]
    );
    if (user.length > 0) {
      throw await genError(
        'El correo electronico ya esta asignado a un usuario',
        409
      );
    }

    //encriptamos
    const passHash = await bcrypt.hash(password, 8);
    //creamos usuario
    const [newUser] = await connection.query(
      `
        INSERT INTO users (email, password, userName, name, surname, image, description) VALUES (?,?,?,?,?,?,?)
        `,
      [email, passHash, userName, name, surname, image, description]
    );

    console.log(newUser.insertId);
    //devuelvbe la id
    return newUser.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createUser,
  getUserByUserName,
  getUserEmail,
};
