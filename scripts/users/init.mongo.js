/**
 * This script is to insert initial data inside the collection people of the database nwt
 * You can use it with mongo-shell or a tool like Robo3T
 */

// Insert users array
db.getCollection('users').insertMany([
  {
    "username": "username1",
    "password": "password1",
    "mail": "mail1@gmail.com",
    "room": "room1"
  },
  {
    "username": "username2",
    "password": "password2",
    "mail": "mail2@gmail.com",
    "room": "room1"
  },
  {
    "username": "username3",
    "password": "password3",
    "mail": "mail3@gmail.com",
    "room": "room2",
  }
]);

// display the final initial data
db.getCollection('users').find({});
