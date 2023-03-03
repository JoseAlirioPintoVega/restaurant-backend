const AppError = require('../utils/appError');

const handleCastError22P02 = err => {
  message = 'Some type of data sent does not match was expected';
  return new AppError(message, 400);
};
const handleJWTExpiredError = err => {
  new AppError('invalide token, please login again', 401);
};
//
const senderErrorDev = (err, res) => {
  res.status(res.statusCode).json({
    status: res.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(res.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR 🧨');
    res.status.json({
      status: 'fail',
      message: 'Something went very wrong',
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';
  if (process.env.NODE_ENV === 'development') {
    senderErrorDev(err, res);
  }
  if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (!err.parent?.code) {
      error = err;
    }
    if (error.parent?.code == '22P02') error = handleCastError22P02(error);
    if (error.name === 'JsonWebTokenError')
      error = handleJWTExpiredError(error);

    sendErrorProd(error, res);
  }
};

module.exports = globalErrorHandler;
