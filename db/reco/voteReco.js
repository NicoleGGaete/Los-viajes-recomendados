const { genError } = require('../../helpers/helpers');
const { getConnection } = require('../db');

//agrega votacion a la reco en la base de datos

const voteReco = async (recoId, userId, vote) => {
  let connection;
  try {
    connection = await getConnection();
    const [reco] = await connection.query(
      `
      SELECT recoId, tittle, spot
      FROM reco
      WHERE recoId=?
      `,
      [recoId]
    );

    const [existVote] = await connection.query(
      `
      SELECT voteId
      FROM recoVotes
      WHERE recoId=? AND userId=?
      `,
      [recoId, userId]
    );
    //hacer que no se vote a el mismo
    if (existVote.length > 0) {
      throw genError(
        `Ya votaste en esta recomendacion ID ${reco[0].recoId}`,
        403
      );
    }

    await connection.query(
      `
    INSERT INTO recoVotes(recoId, vote, dateVote, userId)
    VALUE (?,?, UTC_TIMESTAMP, ?)
          `,
      [recoId, vote, userId]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  voteReco,
};
