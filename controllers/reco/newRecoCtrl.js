// const { genError, upImage, showDebug } = require('../../helpers/helpers');
const { createReco } = require('../../db/reco/createReco');
const { nwRcSchm } = require('../../validators/reco/nwRcSchm');

const newRecoCtrl = async (req, res, next) => {
  try {
    await nwRcSchm.validateAsync(req.body);
    const { tittle, category, spot, openLine, text } = req.body;

    // const images = [];

    // if (req.files && Object.keys(req.files).length > 0) {
    //   for (const [imageName, imageData] of Object.entries(req.files).slice(
    //     0,
    //     3
    //   )) {
    //     try {
    //       showDebug(imageName);
    //       const prossImg = await upImage(imageData);

    //       images.push(prossImg);
    //       return images;
    //     } catch (error) {
    //       throw genError(
    //         'No se pudo procesar la imagen, intente en unos segundos de nuevos',
    //         400
    //       );
    //     }
    //   }
    // }
    // console.log(images);
    const userId = req.userId;
    const id = await createReco(userId, tittle, category, spot, openLine, text);
    console.log();
    res.send({
      status: 'ok',
      message: `Recomendacion con ID: ${id} fue creado exitosamente`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newRecoCtrl,
};
