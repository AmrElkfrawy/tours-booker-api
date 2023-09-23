const express = require('express');

const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');
const tourController = require('../controllers/tourController');

const router = express.Router();

router.get(
  '/checkout-session/:tourID',
  authController.protect,
  bookingController.getCheckoutSession,
);
router.get('/mybookings', authController.protect, bookingController.mybookings);
router.get(
  '/tempbookmethod',
  bookingController.createBookingCheckout,
  tourController.getAllTours,
);

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    bookingController.getAllBookings,
  )
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    bookingController.Createbooking,
  );
router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    bookingController.getBooking,
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    bookingController.updatelBooking,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    bookingController.deletelBooking,
  );
module.exports = router;
