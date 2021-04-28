const express = require('express');
const add = require('./add');
const show = require('./show');
const remove = require('./remove');
const list = require('./list');

const usersRouting = express.Router();
add(usersRouting);
show(usersRouting);
remove(usersRouting);
list(usersRouting);

const usersAPI = express.Router();
usersAPI.use('/users', usersRouting);

module.exports = usersAPI;
