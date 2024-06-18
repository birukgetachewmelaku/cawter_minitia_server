const express = require('express');
const bodyParser = require('body-parser');
const { getMongoCollection } = require('../mongo-connection');

const app = express();

// Set a higher limit for the request body size
app.use(bodyParser.json({ limit: '50mb' }));

// Handle the POST request to /api/data
app.post('/save_sub_brach', async (req, res) => {
  try {
    const { root,root_id, parent_id, child_id, at_count, rb_position_x, rb_position_y,rb_rotation, rotation, velocity_x, velocity_y, angularVelocity,position_x,position_y, check_point_x, check_point_y } = req.body;

    const collection = await getMongoCollection();

    // Check if parent_id exists in the database
    const existingData = await collection.findOne({ child_id:child_id });
    console.log(req.body, "found");

    // If parent_id exists and matches the one in the request body, insert the data
    if (!existingData) {
        const result = await collection.insertOne({ root,root_id, parent_id, child_id, at_count, rb_position_x, rb_position_y,rb_rotation, rotation, velocity_x, velocity_y, angularVelocity,position_x,position_y, check_point_x, check_point_y });
        res.status(200).json({ message: 'Data saved successfully' });
    }else {
      // If parent_id does not exist or does not match, return an error
      console.log("there is the saved parent");
      res.status(200).json({ message: 'not saved: remove saved first' });
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Error saving data to database' });
  }
});

module.exports = app;