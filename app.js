const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const usersRoutes = require('./src/routes/user.routes.js');
const app = express();


// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use('/', usersRoutes);

module.exports = app;
