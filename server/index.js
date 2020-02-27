require('newrelic');
require('dotenv').config();

const express = require('express');

const app = express();
const PORT = process.env.REVIEWS_PORT || 3300;
const client = require('../database');
var cors = require('cors');
const path = require('path');

app.use(express.static('./public'));
app.use(express.json());
app.use(cors());

app.use('/bundle.js', express.static(path.resolve(__dirname, '../public/bundle.js')));
app.use('/:id', express.static(path.resolve(__dirname, '../public')));

// get all reviews attributed to the restraunt with ?id=restaurantId
app.get('/api/reviews/:restaurantId', (req, res) => {
  client.getReviews(parseInt(req.params.restaurantId), (error, rows) => {
    if(error) {
      console.log('ERROR! Failed to find the restaurant\'s reviews', error);
      res.sendStatus(404);
    } else {
      res.status(200).json(rows);
    }
  })
})


//     ).sort('-dineDate')
//     .then((data) => {
//       res.status(200).send(data);
//     })
//     .catch((err) => {
//       console.log('error getting data from database ', err);
//     });
// });


// app.get('/sort/:id/:sorting/:list/', (req, res) => {
//   const list = JSON.parse(req.params.list);
//   let sortField = (req.params.sorting === 'Highest') ? '-overall' : 'overall';
//   if (req.params.sorting === 'Newest' || req.params.sorting === 0) {
//     sortField = '-dineDate';
//   }
//   if (!list.length && sortField !== '-dineDate') {
//     Review.find({ restaurantId: req.params.id }).sort(sortField).sort('-dineDate')
//       .then((data) => {
//         res.status(200).send(data);
//       })
//       .catch((err) => {
//         console.log('error getting data from database ', err);
//       });
//   } else {
//     Review.find({ restaurantId: req.params.id, filterTag: { $in: list } }).sort(sortField).sort('-dineDate')
//       .then((data) => {
//         res.status(200).send(data);
//       })
//       .catch((err) => {
//         console.log('error getting data from database ', err);
//       });
//   }
// });

// CREATE a restaurant review
// app.post('/:restaurantId/', (req, res) => {
//   var review = new Review;
//   review.restaurantId = req.params.restaurantId;
//   review.firstName = req.body.firstName;
//   review.lastName = req.body.lastName;
//   review.city = req.body.city;
//   review.numReviews = req.body.numReviews;
//   review.overall = req.body.overall;
//   review.food = req.body.food;
//   review.service = req.body.service;
//   review.ambience = req.body.ambience;
//   review.dineDate = req.body.dineDate;
//   review.noise = req.body.noise;
//   review.recommend = req.body.recommend;
//   review.comments = req.body.comments;
//   review.filterTag = req.body.filterTag;
//   review.vip = req.body.vip;
//   review.color = req.body.color;

//   review.save((err) => {
//     if (err) console.log(err);
//     res.sendStatus(201)
//   });
// });

// UPDATE a given restaurant review
// app.put('/:reviewId', (req, res) => {
//   Review.updateOne({ _id: req.params.reviewId }, req.body, (error, result) => {
//     if (error) {
//       console.log('error put request', error);
//       res.sendStatus(404);
//     } else {
//       res.json(result);
//     };
//   })
// });

// UPDATE a given restaurant revierw
// app.put('/:reviewId', (req, res) => {
//   Review.updateOne({ _id: req.params.reviewId }, req.body)
//   .then((result) => {
//     res.json(result)
//   })
//   .catch((error) => {
//     console.log('There was an error updating the requested review', error)
//     res.sendStatus(404)
//   });
// });

// DELETE a given restaurant review
//


app.listen(PORT, () => {
  console.log('Listening on port ', PORT);
});

