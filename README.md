# Reviews Service

## Installation
```
npm install
npm run init:postgres
npm run data
npm run load:postgres
npm build || npm run build:dev
npm run start || npm run start:dev
```

## Endpoints

| Action | Endpoint                | Method | Description                             |
|--------|-------------------------|--------|-----------------------------------------|
| Create | /:restaurantId/         | POST   | Create a review for a given restaurant  |
| Read   | /:restaurantId/         | GET    | Read all reviews for a given restaurant |
| Update | /restaurantId/:reviewId | PUT    | Update a given review                   |
| Delete | /restaurantId/:reviewId | DELETE | Remove a given review from the database |