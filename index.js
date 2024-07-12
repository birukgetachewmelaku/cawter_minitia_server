const express = require('express');
const cheack_brach_created = require('./main_branch/cheack_branch_created.js');
const create_main_branch = require('./main_branch/create_main_branch.js');
const load_path = require('./Editor/load_path.js');
const get_moving_path = require('./sub_branch/get_moving_path.js');
const save_sub_branch = require('./sub_branch/save_sub_branch.js');
const delete_path = require('./Editor/delete_path.js');
const get_check_point = require('./the_bot/get_check_point.js');
const get_position = require('./the_bot/get_position.js');
const get_all_check_points_by_root_id = require('./the_bot/get_all_check_points_by_root_id.js');
const test = require('./bomb_input/test.js');
const get_null_bobm_input = require('./bomb_input/get_null_bobm_input.js');

const app = express();



app.use(cheack_brach_created);
app.use(create_main_branch);
app.use(load_path);
app.use(get_moving_path);
app.use(save_sub_branch);
app.use(delete_path);
app.use(get_check_point);
app.use(get_position);
app.use(get_all_check_points_by_root_id);
app.use(test);
app.use(get_null_bobm_input);

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});

// edit the port again