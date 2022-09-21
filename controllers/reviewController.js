const review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };

  const allreview = await review.find(filter);

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
