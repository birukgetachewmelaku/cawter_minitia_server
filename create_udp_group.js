const express = require('express');
const bodyParser = require('body-parser');
const { Groups } = require('./udp.js');

const app = express();

// Set a higher limit for the request body size
app.use(bodyParser.json({ limit: '50mb' }));

// Handle the POST request to /test_1
app.post('/test_1', async (req, res) => {
  try {
    const { root_id } = req.body; // Use root_id from the request body
    // Log groups and their clients
    Groups.forEach((group, port) => {
      console.log(`Clients in Group for port ${port}:`);

      group.forEach((value, client) => {
        console.log(`Client: ${client}, Info:`, value);
      });
    });

    res.status(200).json({ msg: 'Main branch check successful', root_id });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Error retrieving data from database' });
  }
});

// Export the Express app for use in index.js
module.exports = app;