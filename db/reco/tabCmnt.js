const { getConnection } = require('../db');

const tabCmnt = async () => {
  let connection;
  try {
    connection = await getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS comments (
        cmmntId INTEGER PRIMARY KEY AUTO_INCREMENT,
        userId INTEGER NOT NULL,
        recoId INTEGER NOT NULL,
        comment VARCHAR(300) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(userId) REFERENCES users(id),
        FOREIGN KEY(recoId) REFERENCES reco(recoId) 
      )
      `);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  tabCmnt,
};
