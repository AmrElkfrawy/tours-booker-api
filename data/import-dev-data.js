const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');

const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Review = require('../models/reviewModel');
const Booking = require('../models/bookingModel');

dotenv.config('../.env');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connected to the database');
  });

// read data
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'),
);

// import data into the database
const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('Data loaded...');
  } catch (err) {
    console.log(err.message);
  }
  process.exit();
};

// delete all data from db
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    await Booking.deleteMany();
    console.log('Data deleted...');
  } catch (err) {
    console.log(err.message);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
  console.log('Options are only (--import, --delete)');
  process.exit();
}

// console.log(process.argv);

// ----------------------------------------------
// to import data run this in terminal
// first comment encrypting password line at userModel → this.password = await bcrypt.hash(this.password, 12);
// node data/import-dev-data.js --import
// uncomment that line again (:

// to delete
// node data/import-dev-data.js --delete
