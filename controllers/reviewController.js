const review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const rev = new APIFeatures(review.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const allreview = await rev.query;

  res.status(200).json({
    status: 'success',
    results: allreview.length,
    data: {
      allreview
    }
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      newReview
    }
  });
});
