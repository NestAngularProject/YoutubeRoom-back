/**
 * This script is to insert initial data inside the collection people of the database nwt
 * You can use it with mongo-shell or a tool like Robo3T
 */

// Insert rooms array
db.getCollection('rooms').insertMany([
  {
    "name": "Room1",
    "password": "password1",
    "currentVideoID": "strcngsml8lqm1z",
  },
  {
    "name": "Room2",
    "password": "password2",
    "currentVideoID": "g1kbmd999r2cjil",
  },
  {
    "name": "Room3",
    "password": "password3",
    "currentVideoID": "2s6ic5zoge2bsye",
  }
]);

// display the final initial data
db.getCollection('rooms').find({});
