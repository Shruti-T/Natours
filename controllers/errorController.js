const AppError = require('./../utils/appError');

const handelCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handelJWTError = () =>
  new AppError('Invalid Token. Please login again!', 401);

const handelJWTExpires = () =>
  new AppError('Your Token has Expired. Please login again!', 401);

const handelDuplicateFieldsDB = err => {
  const value = err.keyValue.name;
  const message = `Duplicate field value: "${value}". Please use another value!`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = err => {
  const error = Object.values(err.errors).map(el => el.message);
  const message = `Invalid Input data. ${error.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  //operational, trusted error:send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      messgae: err.message
    });
  }
  //Programmin or other unkown error: dont want to leak to the client
  else {
    //1) Log error
    console.error('ERROR', err);

    //2) Sendgeneric message
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!'
    });
  }
};

module.exports = (err, req, res, next) => {
  //   console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.name = err.name;
    if (error.name === 'CastError') {
      error = handelCastErrorDB(error);
    }
    if (error.code === 11000) {
      error = handelDuplicateFieldsDB(error);
    }
    if (error.name === 'ValidationError') {
      error = handleValidationErrorDB(error);
    }
    if (error.name === 'JsonWebTokenError') {
      error = handelJWTError();
    }
    if (error.name === 'TokenExpiredError') {
      error = handelJWTExpires();
    }
    sendErrorProd(error, res);
  }
};
