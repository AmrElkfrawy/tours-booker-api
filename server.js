process.on('uncaughtException', (err) => {
  console.log(err.name);
  console.log(err.message);
  process.exit(1);
});

const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connected to the database..');
  });

const port = process.env.port || 3000;
const server = app.listen(port, () => {
  console.log(`App listening on ${port}....`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name);
  console.log(err.message);

  server.close(() => {
    process.exit(1);
  });
});
