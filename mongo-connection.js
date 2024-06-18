const { MongoClient } = require('mongodb');

const mongoUrl = 'mongodb://127.0.0.1:27017/';
const mongoDbName = 'bot'; // Replace this with the actual name of your database
const mongoCollectionName = 'bot_commands';

let mongoClient;

async function connectToMongo() {
  try {
    mongoClient = await MongoClient.connect(mongoUrl);
    console.log('Connected to MongoDB successfully!');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
}

async function getMongoCollection() {
  if (!mongoClient) {
    await connectToMongo();
  }
  const db = mongoClient.db(mongoDbName);
  return db.collection(mongoCollectionName);
}

module.exports = {
  getMongoCollection,
  mongoClient,
};