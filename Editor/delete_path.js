const express = require('express');
const bodyParser = require('body-parser');
const { getMongoCollection } = require('../mongo-connection');

const app = express();

// Set a higher limit for the request body size
app.use(bodyParser.json({ limit: '50mb' }));

app.post('/delete_path', async (req, res) => {
  try {
    const { data } = req.body;
    const collection = await getMongoCollection();

    // Use the deleteMany() method to delete documents based on the query
    const result = await collection.deleteMany({ chiled_id: data });

    res.status(200).json({ deletedCount: result.deletedCount });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Error deleting data from database' });
  }
});

module.exports = app;