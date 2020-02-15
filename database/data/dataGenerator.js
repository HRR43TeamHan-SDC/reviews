const faker = require('faker/locale/en_US');
const Jabber = require('jabber');
const moment = require('moment');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const buzzWords = ['great food', 'eat', 'service', 'drinks', 'loved', 'never again', 'dessert', 'main menu', 'appetizers', 'enjoyed', 'hated', 'server', 'noise', 'waitress', 'waiter', 'slow', 'fast', 'go again', 'clean', 'dirty', 'kids', 'our group', 'slow service', 'cold food', 'awesome drinks', 'fun time', 'romantic atmosphere', 'dinner', 'lunch', 'breakfast', 'hot plate', 'smelled wonderful', 'no alcohol', 'bartender', 'wine list', 'outdoor seating', 'large room', 'no tips', 'valet parking', 'fine dining', 'dishes', 'shrimp', 'steak', 'chicken', 'beef', 'pasta', 'cake', 'pastries', 'creme brulee', 'simmering', 'coffee', 'fresh food', 'candlelit', 'anniversary', 'birthday', 'party', 'with friends', 'evening', 'stuffed', 'would go again', 'recommend this place', 'restrooms clean', 'host greeting', 'lovely place', 'best view', 'indoor seating', 'waited an hour', 'risotto', 'baked salmon', 'fried rice', 'shrimp scampi', 'sushi', 'wait time'];

const tags = ['Good for groups', 'Desserts', 'Appetizers', 'Drinks', 'Kid friendly'];

const circleColors = ['#6c8ae4', '#d86441', '#bb6acd', '#df4e96'];

const jabber = new Jabber(buzzWords, 2);

// MINDFULLY CHANGE THESE AS DESIRED
const variables = {
  numRestaurants: 30000,
  totalNumRecordsToWrite: 10000000,
  recordsToGenerateEachTime: 5000,
}

const csvWriter = createCsvWriter({
  path: './data.csv',
  header: [
      {id: 'restaurantId', title: 'restaurantId'},
      {id: 'firstName', title: 'firstName'},
      {id: 'lastName', title: 'lastName'},
      {id: 'city', title: 'city'},
      {id: 'numReviews', title: 'numReviews'},
      {id: 'overall', title: 'overall'},
      {id: 'food', title: 'food'},
      {id: 'service', title: 'service'},
      {id: 'ambience', title: 'ambience'},
      {id: 'dineDate', title: 'dineDate'},
      {id: 'noise', title: 'noise'},
      {id: 'recommend', title: 'recommend'},
      {id: 'comments', title: 'comments'},
      {id: 'filterTag', title: 'filterTag'},
      {id: 'vip', title: 'vip'},
      {id: 'color', title: 'color'},
  ]
});

let generateRecords = () => {
  let records = [];
  if(records.length < variables.recordsToGenerateEachTime + 1) {
    records.push({
      restaurantId: Math.floor(Math.random() * variables.numRestaurants),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      city: faker.address.city(),
      numReviews: Math.floor(Math.random() * (25 - 1)) + 1,
      overall: Math.floor(Math.random() * (5 - 1)) + 1,
      food: Math.floor(Math.random() * (5 - 1)) + 1,
      service: Math.floor(Math.random() * (5 - 1)) + 1,
      ambience: Math.floor(Math.random() * (5 - 1)) + 1,
      dineDate: moment(faker.date.between('2019-01-01', '2020-01-24')).format('YYYY-MM-DD'),
      noise: Math.floor(Math.random() * (5 - 1)) + 1,
      recommend: Math.random() < 0.7,
      comments: jabber.createParagraph(Math.floor(Math.random() * (50 - 10)) + 10),
      filterTag: tags[Math.floor(Math.random() * tags.length)],
      vip: Math.random() < 0.3,
      color: circleColors[Math.floor(Math.random() * circleColors.length)],
    })
    generateRecords();
  }
  return records;
}

let recordsWritten = 0;
let writeRecords = () => {
  if(recordsWritten < variables.totalNumRecordsToWrite) {
    let recordsToWrite = generateRecords();
    csvWriter.writeRecords(recordsToWrite)
    .then(() => {
      recordsWritten += recordsToWrite.length
      writeRecords()
    });
  } else {
    console.log(`SUCCESS! You generated ${variables.totalNumRecordsToWrite} records!!!`)
  }
}