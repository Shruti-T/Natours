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

const sendErrorDev = (err, req, res) => {
  //originalUrl means full url except the host.
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }
  //rendered error website page
  console.log('ERROR', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message
  });
};

const sendErrorProd = (err, req, res) => {
  //API
  if (req.originalUrl.startsWith('/api')) {
    //operational, trusted error:send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    }
    //Programmin or other unkown error: dont want to leak to the client
    //1) Log error
    console.error('ERROR', err);
    //2) Sendgeneric message
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong!'
    });
  }
  //Rendered error website
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message
    });
  }
  //Programmin or other unkown error: dont want to leak to the client
  //1) Log error
  console.error('ERROR', err);
  //2) Sendgeneric message
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later.'
  });
};

module.exports = (err, req, res, next) => {
  //   console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    // error.name = err.name;
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
    sendErrorProd(error, req, res);
  }
};
