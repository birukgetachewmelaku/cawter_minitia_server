const express = require('express');
const bodyParser = require('body-parser');
const { getMongoCollection } = require('../mongo-connection.js');
const app = express();
let child_id_ = null;
app.use(bodyParser.json({ limit: '50mb' }));


app.post('/get_position', async (req, res) => {
  try {
    const { child_id } = req.body;

    const collection = await getMongoCollection();
    const document = await collection.findOne({ child_id: child_id }, {
      projection: {
        root: 1,
        root_id: 1,
        parent_id: 1,
        child_id: 1,
        at_count: 1,
        pos_start_index: 1,
        rb_position_x: 1,
        rb_position_y: 1,
        rb_rotation: 1,
        rotation: 1,
        velocity_x: 1,
        velocity_y: 1,
        angularVelocity: 1,
        check_point_x: 1,
        check_point_y: 1,
        position_x: 1,
        position_y: 1,
        throw_pos_x: 1,
        throw_pos_y: 1,
        exploded_pos_x: 1,
        exploded_pos_y: 1,
        throw_angle: 1
      }
    });
    
    console.log("~~~~~~~~~~~~", document);
    res.status(200).json(document);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Error retrieving data from database' });
  }
});

module.exports = app;