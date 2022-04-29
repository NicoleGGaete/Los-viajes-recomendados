require('dotenv').config();

const { getConnection } = require('./db');

async function main() {
  let connection;

  try {
    connection = await getConnection();

    console.log('Borrando tablas existentes');
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
             name VARCHAR(100) NOT NULL,
             surname VARCHAR(100) NOT NULL,
             image VARCHAR(100),
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
            text VARCHAR(300) NOT NULL,
            image VARCHAR(100),
            votes VARCHAR(100) DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(userId) REFERENCES users(id)
        );

       `);
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

main();
