const express = require('express');
const bodyParser = require('body-parser');
const { getMongoCollection } = require('../mongo-connection');

const app = express();

// Set a higher limit for the request body size
app.use(bodyParser.json({ limit: '50mb' }));

app.post('/get_check_point', async (req, res) => {
  try {
    const { data } = req.body;
    const collection = await getMongoCollection();

    if (!Array.isArray(data)) {
      return res.status(400).json({ error: 'data parameter must be an array' });
    }

    const checkPoints = await collection.aggregate([
      { $match: { root_id: { $in: data }, root: true } },
      { $project: { _id: 0, check_point_x: 1, check_point_y: 1, child_id: 1, parent_id: 1, at_count: 1 } },
    ]).toArray();

    // Send the retrieved check_point_x, check_point_y, and child_id values to the client
    res.status(200).json({ checkPoints });
    console.log("$$$$$$$$",checkPoints[0]);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Error retrieving data from database' });
  }
});

module.exports = app;