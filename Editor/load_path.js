const express = require('express');
const bodyParser = require('body-parser');
const { getMongoCollection } = require('../mongo-connection');

const app = express();

// Set a higher limit for the request body size
app.use(bodyParser.json({ limit: '50mb' }));

// Handle the GET request to /load_cheak_points
app.get('/load_path', async (req, res) => {
  try {
    const { data } = req.query;

    const collection = await getMongoCollection();

    // Check if the data is an array
    if (!Array.isArray(data)) {
      return res.status(400).json({ error: 'data parameter must be an array' });
    }

    // Retrieve the check_point_x, check_point_y, and child_id values where parent_id is in the data array
    const checkPoints = await collection.aggregate([
      { $match: { root_id: { $in: data } } },
      { $project: { _id: 0, position_x: 1, position_y: 1, child_id: 1 } },
    ]).toArray();
    //console.log(checkPoints)
    // Send the retrieved check_point_x, check_point_y, and child_id values to the client
    res.status(200).json({ checkPoints });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Error retrieving data from database' });
  }
});

module.exports = app;