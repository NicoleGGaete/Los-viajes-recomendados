const { genError } = require('../../helpers/helpers');
const { getConnection } = require('../db');

//corrobora si existe una reco en la base de datos
const recoExist = async (req, res, next) => {
  console.log('COOOOMOMOMOMO', req.body);

  let connection;
  try {
    connection = await getConnection();
    const { recoId } = req.params;
    console.log('HOLAAA', recoId);
    const [current] = await connection.query(
      `
      SELECT recoId
      FROM reco
      WHERE recoId=?`,
      [recoId]
    );

    if (current.length === 0) {
      throw genError(
        `La recomendacion con ID ${recoId} no existe en la base de datos`,
        404
      );
    } else {
      next();
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  recoExist,
};
