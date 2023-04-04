/*
* This file creates the express app and loads all middleware.
* exports Express app
* */

const express = require('express');
const bodyParser = require('body-parser')
const routes = require('./routes')


const app = express();
app.use(bodyParser.json())
routes(app);

module.exports = app;
