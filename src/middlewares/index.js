const express = require('express');
const {constants} = require('../utils/constants');
const {routers} = require('../routes');
const on404 = require('./404');
const crossOrigin = require('./cross-origin');
const {db} = require('../models');

const {coursesRouter} = routers;
const {routes: {coursesBaseUrl, route404}} = constants;

const app = express();
app.use(crossOrigin);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(coursesBaseUrl, coursesRouter);
app.use(route404, on404);

db.sequelize.sync();

module.exports = app;
