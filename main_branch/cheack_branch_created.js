const express = require('express');
const bodyParser = require('body-parser');
const { getMongoCollection } = require('../mongo-connection');

const app = express();

// Set a higher limit for the request body size
app.use(bodyParser.json({ limit: '50mb' }));

// Handle the GET request to /load_main_branch_names
app.get('/is_main_branch_created', async (req, res) => {
  try {
    const { root_id } = req.body;
    const collection = await getMongoCollection();
    
    // Check if parent_id exists in the database
    const existingData = await collection.findOne({ root_id:root_id });
   // console.log("_______________________",existingData);
    if(existingData){
        res.status(200).json({ message: true });
    }else{
        res.status(200).json({ message: false });
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Error retrieving data from database' });
  }
});



module.exports = app;