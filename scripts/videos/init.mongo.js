/**
 * This script is to insert initial data inside the collection people of the database nwt
 * You can use it with mongo-shell or a tool like Robo3T
 */

// Insert videos array
db.getCollection('videos').insertMany([
  {
    "link": "https://www.youtube.com/watch?v=hTWKbfoikeg",
    "timestamp": "0",
    "seen": "true",
    "room": "room1"
  },
  {
    "link": "https://www.youtube.com/watch?v=vabnZ9-ex7o",
    "timestamp": "20",
    "seen": "false",
    "room": "room2"
  },
  {
    "link": "https://www.youtube.com/watch?v=pkcJEvMcnEg",
    "timestamp": "40",
    "seen": "false",
    "room": "room3"
  },
  {
    "link": "https://www.youtube.com/watch?v=gdSWaIvyQ3o",
    "timestamp": "0",
    "seen": "false",
    "room": "room1"
  }

]);

// display the final initial data
db.getCollection('videos').find({});
