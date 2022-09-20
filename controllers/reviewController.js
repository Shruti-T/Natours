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
  //Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  const newReview = await review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      newReview
    }
  });
});
