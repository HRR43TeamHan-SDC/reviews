// database code
const mongoose = require('mongoose');
const reviewSchema = require('./schema.js');

const mongoUri = 'mongodb://localhost/reviews';
mongoose.Promise = global.Promise;

const db = mongoose.createConnection(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Review = db.model('Review', reviewSchema);

module.exports = Review;