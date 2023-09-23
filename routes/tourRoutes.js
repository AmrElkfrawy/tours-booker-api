const express = require('express');

const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router
  .route('/top-5-cheap')
  .get(tourController.alaisTopTours, tourController.getAllTours);

router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan,
  );
router.route('/tour-stats').get(tourController.getTourStats);

router.get(
  '/tours-within/:distance/center/:latlng/unit/:unit',
  tourController.getTourWithin,
);

router.get('/distances/:latlng/unit/:unit', tourController.getDistances);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour,
  );

router
  .route('/:id')
  .get(authController.protect, tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.updateTour,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour,
  );

router.use('/:tourId/reviews', reviewRouter);

module.exports = router;
