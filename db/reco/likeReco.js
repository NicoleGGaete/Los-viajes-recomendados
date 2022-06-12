const { getConnection } = require('../db');

const likeReco = async (userIdLike, recoId) => {
  let connection;
  // console.log('que tal', userIdLike);
  const like = 1;
  try {
    connection = await getConnection();

    // const [existLike] = await connection.query(
    //   `
    //   SELECT likeId
    //   FROM likes
    //   WHERE recoId = ?
    //   AND userIdLike = ?
    //   `,
    //   [recoId, userIdLike]
    // );

    // console.log(1, existLike[0]);

    // const [pruebita] = await connection.query(
    //   `
    //   SELECT recoId
    //   FROM reco
    //   WHERE userId = 2
    //   `
    // );

    // console.log(2, pruebita[0]);

    // if (existLike.length > 0) {
    //   return true;
    // } else {
    await connection.query(
      `
      INSERT INTO likes
      (userIdLike, recoId, iLike)
      VALues (?,?,?)
      `,
      [userIdLike, recoId, like]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { likeReco };
