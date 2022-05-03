const path = require('path');
const fs = require('fs/promises');
const sharp = require('sharp/lib/sharp');
const uuid = require('uuid');

const imgUploadPth = path.join(__dirname, process.env.UPLOADS_DIR);

const genError = async (message, status) => {
  const error = await new Error(message);
  error.httpStatus = status;
  return error;
};

const createPathIfNot = async (path) => {
  try {
    await fs.access(path);
  } catch (error) {
    await fs.mkdir(path);
  }
};

const upImage = async (uploadImage) => {
  await fs.mkdir(imgUploadPth, { recursive: true });

  const img = sharp(uploadImage.data);

  const imgInfo = await img.metadata();

  if (imgInfo.width > 1000) {
    img.resize(1000);
  }

  const imgFileNm = `${uuid.v4()}.avif`;
  await img.toFile(path.join(imgUploadPth, imgFileNm));

  return imgFileNm;
};

const delImage = async (uploadImage) => {
  await fs.unlink(path.join(imgUploadPth, uploadImage));
};
function showDebug(message) {
  if (process.env.NODE_ENV === 'development') {
    console.log(message);
  }
}
module.exports = { genError, createPathIfNot, upImage, delImage, showDebug };
