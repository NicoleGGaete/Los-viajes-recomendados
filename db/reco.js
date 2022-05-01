const { genError } = require('../helpers');
const { getConnection } = require('./db');

const listReco = async (search, order, direction) => {
  let connection;

  try {
    connection = await getConnection();

    const orderDir =
      (direction && direction.toLowerCase()) === 'desc' ? 'DESC' : 'ASC';

    let orderBy;
    switch (order) {
      case 'vote':
        orderBy = 'vote';
        break;
      default:
        orderBy = 'created_at';
    }

    let queryOutcome;
    if (search) {
      queryOutcome = await connection.query(
        `
            SELECT reco.recoId, reco.userId, tittle, image, openLine
            FROM reco
            WHERE category LIKE ? OR spot LIKE ?
            ORDER BY ${orderBy} ${orderDir}
            
            `,
        [`%${search}%`, `%${search}%`]
      );
    } else {
      queryOutcome = await connection.query(
        `SELECT reco.recoId, reco.userId, tittle, image, openLine 
                FROM reco ORDER BY ${orderBy} ${orderDir}`
      );
    }
    const [upshot] = queryOutcome;
    return upshot;
  } finally {
    if (connection) connection.release();
  }
};

const getRecoId = async (recoId) => {
  let connection;
  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
        SELECT * FROM reco WHERE recoId = ?
        `,
      [recoId]
    );
    if (result.length === 0) {
      throw await genError(
        `La recomendacion con el ID: ${recoId} no existe`,
        404
      );
    }
    return result[0];
  } finally {
    if (connection) connection.release();
  }
};
module.exports = {
  listReco,
  getRecoId,
};
