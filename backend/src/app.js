// create Express app
const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());

// routes
const rootRoutes = require('./api/root_api');
app.use(rootRoutes);

const userRoutes = require('./api/users_api');
app.use('/users', userRoutes);

module.exports = app;