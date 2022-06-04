// const { genError, upImage, showDebug } = require('../../helpers/helpers');
const { createReco } = require('../../db/reco/createReco');
const { nwRcSchm } = require('../../validators/reco/nwRcSchm');
const path = require('path');
const sharp = require('sharp');
const { nanoid } = require('nanoid');
const { createPathIfNot } = require('../../helpers/helpers');

const newRecoCtrl = async (req, res, next) => {
  try {
    await nwRcSchm.validateAsync(req.body);
    const { tittle, category, spot, openLine, text } = req.body;

    let imageFileName;

    if (req.files && req.files.image) {
      const uploadsDir = path.join(__dirname, '../../uploads');

      await createPathIfNot(uploadsDir);

      const image = sharp(req.files.image.data);
      image.resize(500);

      imageFileName = `${nanoid(24)}.jpg`;

      await image.toFile(path.join(uploadsDir, imageFileName));
    }

    const userId = req.userId;
    const id = await createReco(
      userId,
      tittle,
      category,
      spot,
      openLine,
      text,
      imageFileName
    );
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
