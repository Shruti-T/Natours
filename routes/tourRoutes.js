const express = require('express');
// const axios = require('axios');
const fetch = require('node-fetch');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const reviewRouter = require('../routes/reviewRoutes');

// import fetch from 'node-fetch';

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);
// router.param('id', tourController.checkID);
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);

router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan
  );

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);
//it would look like -> tours-within/300/center/34.105497,-118.119398/unit/mi

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

// router.route('/coffeeTest/:coffeeData').get(async (req, res) => {
//   let quality = 0;
//   await axios
//     .get(
//       'https://python-public-api-production.up.railway.app/?my_dict={%22aroma%22:8.67,%22Flavor%22:8.83,%22Acidity%22:8.75,%22Body%22:8.5,%22Balance%22:8.42,%22Uniformity%22:10.0,%22Clean.Cup%22:10.0,%22Sweetness%22:10.0,%22Cupper.Points%22:8.75,%22Moisture%22:0.12,%22Quakers%22:0.0,%22Category.One.Defects%22:0.0,%22Category.Two.Defects%22:0,%22altitude_mean_meters%22:2075.0}'
//     )
//     .then(ans => {
//       quality = ans.data;
//       console.log(ans.data);
//     })
//     .catch(err => {
//       console.error(err);
//       quality = 0;
//     });

//   res.status(200).json({
//     quality
//   });
// });

router.route('/coffeeTest/:coffeeData').get(async (req, res) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      Inputs: {
        data: [
          {
            Aroma: 8.67,
            Flavor: 8.83,
            Aftertaste: 8.67,
            Acidity: 8.75,
            Body: 8.5,
            Balance: 8.42,
            Uniformity: 10,
            Clean_Cup: 10,
            Sweetness: 10,
            Cupper_Points: 8.75,
            Moisture: 0.12,
            Quakers: 0,
            Category_One_Defects: 0,
            Category_Two_Defects: 0,
            altitude_mean_meters: 2075
          }
        ]
      },
      GlobalParameters: 0.0
    })
  };
  const fetchRes = fetch(
    'http://835cf46b-f9ac-48e4-a324-560e9fa3bf70.eastus2.azurecontainer.io/score',
    options
  );
  fetchRes
    .then(ans => ans.json())
    .then(d => {
      console.log(d.Results[0]);
    });
});

module.exports = router;
