const {courseRoutes} = require('./courses');

const API_BASE_URL = '/api';
const VIEWS_BASE_URL = '/courses';
const COURSES_BASE_URL = `${API_BASE_URL}/courses`;
const ROUTE_404 = '**';

exports.routes = {
	courseRoutes,
	baseUrl: API_BASE_URL,
	coursesBaseUrl: COURSES_BASE_URL,
	coursesViewUrl: VIEWS_BASE_URL,
	route404: ROUTE_404
};
