/**
 * This script is to insert initial data inside the collection people of the database nwt
 * You can use it with mongo-shell or a tool like Robo3T
 */

// Insert rooms array
db.getCollection('rooms').insertMany([
  {
    "name": "room1",
    "password": "password1",
    "currentVideoID": "5dd49a3ed9fe78e237497dbb",
    "timestamp": "0",
  },
  {
    "name": "room2",
    "password": "password2",
    "currentVideoID": "5dd49a3ed9fe78e237497dbc",
    "timestamp": "40",
  },
  {
    "name": "room3",
    "password": "password3",
    "currentVideoID": "5dd49a3ed9fe78e237497dbd",
    "timestamp": "70",
  }
]);

// display the final initial data
db.getCollection('rooms').find({});
