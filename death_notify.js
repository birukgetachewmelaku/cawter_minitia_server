const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const died_player_ids = [];
let kill_id;
app.use(bodyParser.json());

// Handle the POST request to /death_notify
app.post('/death_notify', async (req, res) => {
  try {
    const { player_id, } = req.body; // Use root_id from the request body
    console.log(`Received player_id: ${player_id}`); // Debugging statement

    if (!died_player_ids.includes(player_id)) {
      died_player_ids.push(player_id);
      //kill_id = (Math.floor(Math.random() * (99999 - 1000 + 1)) + 1000).toString();
      res.status(200).json({ msg: 'Accepted'});
      console.log(`Inserted: ${player_id}`);
    } else {
      res.status(200).json({ msg: 'pre_death' });
      console.log(`already exists with value: ${player_id}}`);
    }
    
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Error retrieving data from database' });
  }
});


module.exports = app;
