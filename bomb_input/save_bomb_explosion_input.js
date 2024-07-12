const express = require('express');
const bodyParser = require('body-parser');
const { getMongoCollection } = require('../mongo-connection.js');
const app = express();
let child_id_ = null;
app.use(bodyParser.json({ limit: '50mb' }));


app.post('/save_bomb_explosion_input', async (req, res) => {
    try {
      const { child_id, check_point_indexs, throw_angle, exploded_pos_x, exploded_pos_y } = req.body;
      const collection = await getMongoCollection();
      const result = await collection.updateOne(
        { child_id: child_id },
        {
          $set: {
            "check_point_indexs": check_point_indexs,
            "throw_angle": throw_angle,
            "exploded_pos_x": exploded_pos_x,
            "exploded_pos_y": exploded_pos_y
          }
        }
      );
      console.log("~~~~~~~~~~~~", result);
      res.status(200).json({ message: 'Data updated successfully' });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Error updating data in the database' });
    }
  });

module.exports = app;