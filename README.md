# Reviews Service

## Installation
1. `npm install`
2. `npm run init:postgres`
3. `npm run data`
4. `npm run load:postgres`
5. `npm build` || `npm run build:dev`
6. `npm run start` || `npm run start:dev`

## Endpoints

| Action | Endpoint                | Method | Description                             |
|--------|-------------------------|--------|-----------------------------------------|
| Create | /:restaurantId/         | POST   | Create a review for a given restaurant  |
| Read   | /:restaurantId/         | GET    | Read all reviews for a given restaurant |
| Update | /restaurantId/:reviewId | PUT    | Update a given review                   |
| Delete | /restaurantId/:reviewId | DELETE | Remove a given review from the database |