const express = require('express');
const death_notify = require('./death_notify.js');
require('./udp.js');

const app = express();



app.use(death_notify);

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});