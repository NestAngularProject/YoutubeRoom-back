/**
 * This script is to create index inside the collection people of the database nwt
 * You can use it with mongo-shell or a tool like Robo3T
 */
db.getCollection('users').createIndex({ username: 1}, { unique: true });
db.getCollection('users').createIndex({ mail: 1}, { unique: true });
