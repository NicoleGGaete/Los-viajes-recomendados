const { getConnection } = require('../db');

const likeExistReco = async (userIdLike, recoId) => {
  let connection;
  console.log('userId', userIdLike);
  console.log('recoId', recoId);
  // const like = 1;
  try {
    connection = await getConnection();

    const [existLike] = await connection.query(
      `
      SELECT likeId 
      FROM likes
      WHERE recoId = ?
      AND userIdLike = ?
      `,
      [recoId, userIdLike]
    );

    console.log(1, existLike);

    // const [pruebita] = await connection.query(
    //   `
    //   SELECT recoId
    //   FROM reco
    //   WHERE userId = 2
    //   `
    // );

    // console.log(2, pruebita[0]);

    // if
    return existLike.length > 0
      ? // {
        true
      : false;
    // } else {
    //   await connection.query(
    //     `
    //   INSERT INTO likes
    //   (userIdLike, recoId, iLike)
    //   VALues (?,?,?)
    //   `,
    //     [userIdLike, recoId, like]
    //   );
    // }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { likeExistReco };
