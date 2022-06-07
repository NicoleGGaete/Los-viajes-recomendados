// const path = require('path');
const fs = require('fs/promises');

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

// const delImage = async (uploadImage) => {
//   await fs.unlink(path.join(imgUploadPth, uploadImage));
// };
// function showDebug(message) {
//   if (process.env.NODE_ENV === 'development') {
//     console.log(message);
//   }
// }
module.exports = { genError, createPathIfNot };
