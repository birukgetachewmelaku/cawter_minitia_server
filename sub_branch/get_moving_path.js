const express = require('express');
const bodyParser = require('body-parser');
const { getMongoCollection } = require('../mongo-connection.js');
const app = express();
let child_id_ = null;
app.use(bodyParser.json({ limit: '50mb' }));

app.post('/selected_path_id', async (req, res) => {
  try {
    const { child_id } = req.body;
    child_id_ = child_id;
    console.log("@@@@@@@@@",child_id_);
    res.status(200).json({ message: "FFFFhhhhhhFFFFFF" });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Error saving data to database' });
  }
});

app.get('/load_rigidbody_state', async (req, res) => {
  try {
    const { data } = req.query;

    const collection = await getMongoCollection();
    const document = await collection.findOne({ child_id: child_id_ }, {
      projection: {
        root: 1,
        root_id: 1,
        parent_id: 1,
        child_id: 1,
        at_count: 1,
        rb_position_x: 1,
        rb_position_y: 1,
        rb_rotation: 1,
        rotation: 1,
        velocity_x: 1,
        velocity_y: 1,
        angularVelocity: 1
      }
    });
    
   // console.log("~~~~~~~~~~~~", document);
    res.status(200).json(document);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Error retrieving data from database' });
  }
});

module.exports = app;