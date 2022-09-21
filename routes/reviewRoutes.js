const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

//POST /Tour/id-19301/reviews   (this is the nested route)
//POST /Tour/id-19301/reviews
//GET /Tour/id-19301/reviews
//GET /Tour/id-19301/reviews/reviewId-19301
//POST /reviews

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview
  );

module.exports = router;
