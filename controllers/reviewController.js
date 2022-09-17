const review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const allreview = await review.find();

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
