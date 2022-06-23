require('dotenv').config();

const { getConnection } = require('./db');

async function main() {
  let connection;

  try {
    connection = await getConnection();

    console.log('Borrando tablas existentes');
    await connection.query('DROP TABLE IF EXISTS likes');
    await connection.query('DROP TABLE IF EXISTS comments');
    await connection.query('DROP TABLE IF EXISTS reco');
    await connection.query('DROP TABLE IF EXISTS users');

    console.log('Creando tablas');

    await connection.query(`
         CREATE TABLE users (
             id INTEGER PRIMARY KEY AUTO_INCREMENT,
             email VARCHAR(100) UNIQUE NOT NULL,
             password VARCHAR(100) NOT NULL, 
             created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
             userName VARCHAR(100) UNIQUE NOT NULL,
             avatar VARCHAR(100),
             description VARCHAR(280),
             role ENUM("normal", "admin") DEFAULT "normal" NOT NULL

         )

        `); //corregi dos errores de sintaxis y complete el campo "role" de la tabla users
    //puse en minuscula el nombre de la tabla
    await connection.query(`
        CREATE TABLE reco (
            recoId INTEGER PRIMARY KEY AUTO_INCREMENT,
            userId INTEGER NOT NULL,
            tittle VARCHAR(100)  NOT NULL,
            category VARCHAR(100) NOT NULL,
            spot VARCHAR(100) NOT NULL,
            openLine VARCHAR(100) NOT NULL,
            text VARCHAR(3000) NOT NULL,
            image VARCHAR(100),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES users(id)
           
        );

       `);

    await connection.query(`
    CREATE TABLE comments (
      cmmntId INTEGER PRIMARY KEY AUTO_INCREMENT,
      recoId INTEGER NOT NULL,
      userId INTEGER NOT NULL,
      comment VARCHAR(300) NOT NULL,
      replyId INTEGER DEFAULT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(recoId) REFERENCES reco(recoId)
    )
    `);
    //CAMBIAR EL DATETIME A DEFAULT
    await connection.query(`
    CREATE TABLE likes (
      likeId TINYINT PRIMARY KEY AUTO_INCREMENT,
      userIdLike TINYINT NOT NULL,
      recoId INTEGER NOT NULL,
      iLike TINYINT DEFAULT 0 NOT NULL,
      dateLike DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(recoId) REFERENCES reco(recoId)


    )`);
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

main().catch((error) => console.error(error));
