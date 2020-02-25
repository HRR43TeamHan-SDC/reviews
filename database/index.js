// database code
const { Client } = require('pg');

// PostgreSQL
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'reviews',
  port: 5432,
});

client.connect()
.then(() => {
  console.log('SUCCESS! Connected to the database!')
})
.catch(()=>{
  console.log('ERROR! Unable to connect to the database!')
});

const getReviews = (id, callback) => {
  client.query(`SELECT review_id "reviewId", restaurant_id "restaurantId", first_name "firstName", last_name "lastName", city, num_reviews "numReviews", food, service, ambience, dine_date "dineDate", noise, recommend, comments, filter_tag "filterTag", vip, color FROM reviews WHERE restaurant_id = $1`, [id], (error, result) => {
    if(error) {
      callback(error);
    } else {
      callback(null, result.rows);
    }
  })
}

module.exports.getReviews = getReviews
// module.exports = getAllReviews




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