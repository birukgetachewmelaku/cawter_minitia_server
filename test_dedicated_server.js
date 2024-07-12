const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));

let counter_ = 0;
app.post('/update_counter', async (req, res) => {
  try {
    const { counter } = req.body;
    counter_ = counter;
    res.status(200).json(counter);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Error retrieving data from database' });
  }
});
app.get('/get_counter', async (req, res) => {
    try {
      console.log("##################",req.body);
      res.status(200).json(counter_);
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Error retrieving data from database' });
    }
  });

module.exports = app;