const express = require('express');
const {constants} = require('../utils/constants');
const {routers} = require('../routes');
const on404 = require('./404');
const crossOrigin = require('./cross-origin');
const {coursesViewsRouter} = require('../routes/courses');

const {coursesRouter} = routers;
const {routes: {coursesBaseUrl, route404, coursesViewUrl}} = constants;

exports.setUpMiddlewares = (app) => {
	app.use(crossOrigin);
	app.use(express.json());
	app.use(express.urlencoded({extended: true}));
	app.use(coursesBaseUrl, coursesRouter);
	app.use(coursesViewUrl, coursesViewsRouter);
	app.use(route404, on404);
};
