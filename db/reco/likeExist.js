const { genError } = require('../../helpers/helpers');
const { getConnection } = require('../db');

//corrobora si existe una reco en la base de datos
const likeExist = async (req, res, next) => {
  let connection;
  try {
    connection = await getConnection();
    const { recoId } = req.params;
    const userIdLike = req.userId;
    const [existLike] = await connection.query(
      `
      SELECT likeId 
      FROM likes
      WHERE recoId = ?
      AND userIdLike = ?
      `,
      [recoId, userIdLike]
    );

    if (existLike.length > 0) {
      throw genError(`Ya le diste like`, 404);
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
  likeExist,
};
