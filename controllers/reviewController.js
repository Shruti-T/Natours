const review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
// const APIFeatures = require('./../utils/apiFeatures');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const allreview = review.find();

  res.status(200).json({
    status: 'success',
    results: allreview.length,
    data: {
      allreview
    }
  });
});
