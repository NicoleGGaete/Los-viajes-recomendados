const { getConnection } = require('../db/db');

const editIfExist = async (id, email) => {
  let connection;
  try {
    connection = await getConnection();

    if (!email) {
      const [emailOrg] = await connection.query(
        `
      SELECT email
      FROM users
      WHERE id=?
          `,
        [id]
      );
      console.log('HOLAAAAAAAAAAAAAA' + emailOrg);
    }
    return email;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  editIfExist,
};
