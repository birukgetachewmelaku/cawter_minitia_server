const express = require('express');
const cheack_brach_created = require('./main_branch/cheack_branch_created.js')
const create_main_branch = require('./main_branch/create_main_branch.js');
const load_path = require('./Editor/load_path.js');
const get_moving_path = require('./sub_branch/get_moving_path.js');
const save_sub_branch = require('./sub_branch/save_sub_branch.js');
const app = express();



app.use(cheack_brach_created);
app.use(create_main_branch);
app.use(load_path);
app.use(get_moving_path);
app.use(save_sub_branch);


app.listen(8000, () => {
  console.log('Server is running on port 4000');
});