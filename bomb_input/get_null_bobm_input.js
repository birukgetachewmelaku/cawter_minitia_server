const express = require('express');
const bodyParser = require('body-parser');
const { getMongoCollection } = require('../mongo-connection.js');
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));


app.get('/get_null_bomb_input', async (req, res) => {
  try {
    const collection = await getMongoCollection();
    const childData = await collection.findOne(
      {
        $or: [
          { throw_pos_x: { $exists: false } },
          { throw_pos_y: { $exists: false } },
          { throw_angle: { $exists: false } },
          { exploded_pos_x: { $exists: false } },
          { exploded_pos_y: { $exists: false } }
        ]
      },
      { projection: { child_id: 1, check_point_x: 1, check_point_y: 1 } }
    );

    if (childData !== null) {
      console.log('check_point_ X:', childData.check_point_x);
      console.log('check_point_ Y:', childData.check_point_y);
      console.log('child_id:', childData.child_id);
      res.status(200).json({ child_id: childData.child_id, check_point_x: childData.check_point_x, check_point_y: childData.check_point_y });
    } else {
      console.log('No child data found without the required fields.');
      res.status(200).json();
    }
  } catch (err) {
    console.error('Error:', err); 
    res.status(500).json({ error: 'Error fetching child data from the database' });
  }
});
module.exports = app;