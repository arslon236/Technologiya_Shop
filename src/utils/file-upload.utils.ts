export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Faqat rasm fayllari ruxsat etiladi!'), false);
  }
  callback(null, true);
};
