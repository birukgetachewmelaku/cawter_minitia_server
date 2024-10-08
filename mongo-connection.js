// const { MongoClient } = require('mongodb');

// const mongoUrl = 'mongodb://127.0.0.1:27017/';
// const mongoDbName = 'bot'; // Replace this with the actual name of your database
// const mongoCollectionName = 'bot_commands';
// const mongo_bomb_input_CollectionName = 'bomb_input';

// let mongoClient;

// async function connectToMongo() {
//   try {
//     mongoClient = await MongoClient.connect(mongoUrl);
//     console.log('Connected to MongoDB successfully!');
//   } catch (err) {
//     console.error('Error connecting to MongoDB:', err);
//     throw err;
//   }
// }

// async function getMongoCollection() {
//   if (!mongoClient) {
//     await connectToMongo();
//   }
//   const db = mongoClient.db(mongoDbName);
//   return db.collection(mongoCollectionName);
// }
// async function getbomb_input_Collection() {
//   if (!mongoClient) {
//     await connectToMongo();
//   }
//   const db = mongoClient.db(mongoDbName);
//   return db.collection(mongo_bomb_input_CollectionName);
// }
// module.exports = {
//   getMongoCollection,
//   getbomb_input_Collection,
//   mongoClient,
// };