const express = require('express');
const bodyParser = require('body-parser');
const { getMongoCollection } = require('./mongo-connection.js');
const app = express();
let child_id_ = null;
app.use(bodyParser.json({ limit: '50mb' }));


app.post('/delete', async (req, res) => {
  try {

    const collection = await getMongoCollection();
    const result = await collection.updateMany(
      { exploded_pos_y: { $exists: true } },
      {
        $unset: {
          exploded_pos_y: '',
          exploded_pos_x: '',
          throw_angle: '',
          throw_pos_y: '',
          throw_pos_x: ''
        }
      }
    );

    
    console.log("~~~~~~~~~~~~", result);
   // res.status(200).json(document);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Error retrieving data from database' });
  }
});

module.exports = app;