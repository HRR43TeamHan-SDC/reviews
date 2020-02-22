const faker = require('faker/locale/en_US');
const Jabber = require('jabber');
const moment = require('moment');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const path = require('path');

const buzzWords = ['great food', 'eat', 'service', 'drinks', 'loved', 'never again', 'dessert', 'main menu', 'appetizers', 'enjoyed', 'hated', 'server', 'noise', 'waitress', 'waiter', 'slow', 'fast', 'go again', 'clean', 'dirty', 'kids', 'our group', 'slow service', 'cold food', 'awesome drinks', 'fun time', 'romantic atmosphere', 'dinner', 'lunch', 'breakfast', 'hot plate', 'smelled wonderful', 'no alcohol', 'bartender', 'wine list', 'outdoor seating', 'large room', 'no tips', 'valet parking', 'fine dining', 'dishes', 'shrimp', 'steak', 'chicken', 'beef', 'pasta', 'cake', 'pastries', 'creme brulee', 'simmering', 'coffee', 'fresh food', 'candlelit', 'anniversary', 'birthday', 'party', 'with friends', 'evening', 'stuffed', 'would go again', 'recommend this place', 'restrooms clean', 'host greeting', 'lovely place', 'best view', 'indoor seating', 'waited an hour', 'risotto', 'baked salmon', 'fried rice', 'shrimp scampi', 'sushi', 'wait time'];

const tags = ['Good for groups', 'Desserts', 'Appetizers', 'Drinks', 'Kid friendly'];

const circleColors = ['#6c8ae4', '#d86441', '#bb6acd', '#df4e96'];

const jabber = new Jabber(buzzWords, 2);

// MINDFULLY CHANGE THESE AS DESIRED
const variables = {
  numRestaurants: 100,
  totalNumRecordsToWrite: 10000000,
  recordsToGenerateEachTime: 1000,
}

const csvWriter = createCsvWriter({
  path: './database/data/data7.csv',
  header: [
      {id: 'review_id', title: 'review_id'},
      {id: 'restaurant_id', title: 'restaurant_id'},
      {id: 'first_name', title: 'first_name'},
      {id: 'last_name', title: 'last_name'},
      {id: 'city', title: 'city'},
      {id: 'num_reviews', title: 'num_reviews'},
      {id: 'overall', title: 'overall'},
      {id: 'food', title: 'food'},
      {id: 'service', title: 'service'},
      {id: 'ambience', title: 'ambience'},
      {id: 'dine_date', title: 'dine_date'},
      {id: 'noise', title: 'noise'},
      {id: 'recommend', title: 'recommend'},
      {id: 'comments', title: 'comments'},
      {id: 'filter_tag', title: 'filter_tag'},
      {id: 'vip', title: 'vip'},
      {id: 'color', title: 'color'},
  ]
});

let id = 1;
let generateRecords = () => {
  let records = [];
  while (records.length < variables.recordsToGenerateEachTime) {
    records.push({
      review_id: id,
      restaurant_id: Math.floor(Math.random() * variables.numRestaurants),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      city: faker.address.city(),
      num_reviews: Math.floor(Math.random() * (25 - 1)) + 1,
      overall: Math.floor(Math.random() * (5 - 1)) + 1,
      food: Math.floor(Math.random() * (5 - 1)) + 1,
      service: Math.floor(Math.random() * (5 - 1)) + 1,
      ambience: Math.floor(Math.random() * (5 - 1)) + 1,
      dine_date: moment(faker.date.between('2019-01-01', '2020-01-24')).format('YYYY-MM-DD'),
      noise: Math.floor(Math.random() * (5 - 1)) + 1,
      recommend: Math.random() < 0.7,
      comments: jabber.createParagraph(Math.floor(Math.random() * (50 - 10)) + 10),
      filter_tag: tags[Math.floor(Math.random() * tags.length)],
      vip: Math.random() < 0.3,
      color: circleColors[Math.floor(Math.random() * circleColors.length)],
    });
    id++;
  }
  return records;
}

let recordsWritten = 0;
let writeRecords = () => {
  if(recordsWritten < variables.totalNumRecordsToWrite) {
    let recordsToWrite = generateRecords();
    csvWriter.writeRecords(recordsToWrite)
    .then(() => {
      console.log(`Good work! You have created ${recordsWritten} records!`)
      recordsWritten += recordsToWrite.length
      writeRecords()
    });
  } else {
    console.timeEnd('writeRecords')
    console.log(`SUCCESS! You generated ${variables.totalNumRecordsToWrite} records!!!`)
  }
}

console.time('writeRecords');
writeRecords();

fs.writeFile('./database/postgreSQL/loader.sql', `
COPY reviews (
  review_id,
  restaurant_id,
  first_name,
  last_name,
  city,
  num_reviews,
  overall,
  food,
  service,
  ambience,
  dine_date,
  noise,
  recommend,
  comments,
  filter_tag,
  vip,
  color
) FROM '${path.join(__dirname, '/data7.csv')}' CSV HEADER;`, (err) => {if(err) throw err}
);