const { INTERNAL_SERVER_ERROR, FORBIDDEN } = require('../utils/errorCodes');

module.exports = ((err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;
  // console.log(statusCode);
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  // console.log(statusCode);
  next();
});
