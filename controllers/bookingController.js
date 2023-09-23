const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.getAllBookings = factory.getAll(Booking);
exports.getBooking = factory.getOne(Booking);
exports.Createbooking = factory.createOne(Booking);
exports.updatelBooking = factory.updateOne(Booking);
exports.deletelBooking = factory.deletOne(Booking);

exports.mybookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user._id });
  res.status(200).json({
    status: 'success',
    data: bookings,
  });
});

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get currently booked tour
  const tour = await Tour.findById(req.params.tourID);

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get(
      'host',
    )}/api/v1/bookings/tempbookmethod/?tour=${req.params.tourID}&user=${
      req.user.id
    }&price=${tour.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourID,
    line_items: [
      {
        price_data: {
          unit_amount: tour.price * 100,
          currency: 'usd',
          product_data: {
            name: `${tour.name} Tour`,
            images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
            description: tour.summary,
          },
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
  });

  // 3) Create session as response
  res.status(200).json({
    status: 'success',
    url: session.url,
    session,
  });
});

// temporary when working in local host, hosted website will use webhooks
exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  // console.log(req.query);
  const { tour, user, price } = req.query;
  if (!tour || !user || !price) return next();

  await Booking.create({
    tour,
    user,
    price,
  });
  const newUrl = `${req.originalUrl.split('tempbookmethod')[0]}`.replace(
    'bookings',
    'tours',
  );
  // console.log(newUrl);
  res.redirect(newUrl);
});
