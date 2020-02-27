const { Client } = require('pg');

const client = new Client({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: 'reviews',
  password: process.env.POSTGRES_PSWD || 'password',
  port: process.env.POSTGRES_PORT || 5432,
  application_name: 'reviews_module',
});

client.connect()
.then(() => {
  console.log('SUCCESS! Connected to the database!')
})
.catch(()=>{
  console.log('ERROR! Unable to connect to the database!')
});

const getReviews = (id, callback) => {
  client.query(`SELECT review_id "reviewId", restaurant_id "restaurantId", first_name "firstName", last_name "lastName", city, num_reviews "numReviews", food, service, ambience, dine_date "dineDate", noise, recommend, comments, filter_tag "filterTag", vip, color FROM reviews WHERE restaurant_id = $1 ORDER BY dine_date DESC`, [id], (error, result) => {
    if(error) {
      callback(error);
    } else {
      callback(null, result.rows);
    }
  })
}

module.exports.getReviews = getReviews


//MONGOOSE CODE

// const mongoose = require('mongoose');
// const reviewSchema = require('./schema.js');

// const mongoUri = 'mongodb://localhost/reviews';
// mongoose.Promise = global.Promise;

// const db = mongoose.createConnection(mongoUri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const Review = db.model('Review', reviewSchema);

// module.exports = Review;