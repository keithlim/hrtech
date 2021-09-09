// create Express app
const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());

// routes
const root = require('./routes/root');
app.use(root);

const userRoutes = require('./routes/users');
app.use('/users', userRoutes)

module.exports = app;