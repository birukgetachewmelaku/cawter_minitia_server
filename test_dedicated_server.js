const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));

let counter_ = 0;
let container = [];
app.post('/test1', async (req, res) => {
  try {
    const { counter } = req.body;
    counter_ = counter;
    for(let i=0; i<1000000; i++){
        container.push(generateRandomString());
    }

    res.status(200).json(container.length);
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


  function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    let length = 10;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }
module.exports = app;