const express = require('express');

const app = express();
const PORT = 3300;
const Review = require('../database');
var cors = require('cors');

app.use(express.static('./public'));
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log('Listening on port ', PORT);
});

// app.get('/favicon.ico', (req, res) => {
//   console.log('FAVICON LOOKUP');
//   res.status(200).end();
// });

// get all reviews attributed to the restraunt with ?id=restaurantId
app.get('/:restaurantId/', (req, res) => {
  Review.find(req.params).sort('-dineDate')
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log('error getting data from database ', err);
    });
});


app.get('/sort/:id/:sorting/:list/', (req, res) => {
  const list = JSON.parse(req.params.list);
  let sortField = (req.params.sorting === 'Highest') ? '-overall' : 'overall';
  if (req.params.sorting === 'Newest' || req.params.sorting === 0) {
    sortField = '-dineDate';
  }
  if (!list.length && sortField !== '-dineDate') {
    Review.find({ restaurantId: req.params.id }).sort(sortField).sort('-dineDate')
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        console.log('error getting data from database ', err);
      });
  } else {
    Review.find({ restaurantId: req.params.id, filterTag: { $in: list } }).sort(sortField).sort('-dineDate')
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        console.log('error getting data from database ', err);
      });
  }
});

// CREATE a new review
app.post('/:restaurantId/', (req, res) => {
  var review = new Review;
  review.restaurantId = req.params.restaurantId;
  review.firstName = req.body.firstName;
  review.lastName = req.body.lastName;
  review.city = req.body.city;
  review.numReviews = req.body.numReviews;
  review.overall = req.body.overall;
  review.food = req.body.food;
  review.service = req.body.service;
  review.ambience = req.body.ambience;
  review.dineDate = req.body.dineDate;
  review.noise = req.body.noise;
  review.recommend = req.body.recommend;
  review.comments = req.body.comments;
  review.filterTag = req.body.filterTag;
  review.vip = req.body.vip;
  review.color = req.body.color;
  console.log(review);

  review.save((err) => {
    if(err) console.log(err);
    res.sendStatus(201);
  })
});

// UPDATE a review
app.put('/:restaurantId/:reviewId', (req, res) => {
  Review.put({})
});

app.delete('/:restaurantId/:reviewId', (req, res) => {
  Review.deleteOne({ reviewId: req.params.reviewId })

});
