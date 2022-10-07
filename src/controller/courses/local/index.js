/** @type {import("express").RequestHandler} */
const Joi = require('joi');

const courses = [];

const getCourses = (req, res) => {
	res.send(courses);
};

const validateCourse = (course) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		creditHours: Joi.number().min(1).max(4).required()
	});

	return schema.validate(course, {abortEarly: false});
};

const getErrors = (error) => error.details.map(({message, context: {key}}) => ({message, key}));

const createCourse = (req, res) => {
	const {error, value} = validateCourse(req.body);

	if (error) {
		res.status(400).send(getErrors(error));
		return;
	}

	const course = {...value, id: courses.length + 1};
	courses.push(course);
	res.status(200).send(course);
};

const getCourseById = (courseId) => {
	const index = courses.findIndex(({id}) => id === courseId);

	return {course: courses[index], index};
};

const INVALID_ID_RESPONSE = {message: 'No course found with given id'};

const getCourse = (req, res) => {
	const {course} = getCourseById(+req.params.id);

	if (course) {
		res.status(200).send(course);
		return;
	}

	res.status(404).send(INVALID_ID_RESPONSE);
};

const updateCourse = (req, res) => {
	const {course, index} = getCourseById(+req.params.id);

	if (course) {
		const {error, value} = validateCourse({...course, ...req.body});
		if (value) {
			courses.splice(index, 1, value);
			res.status(200).send(value);
			return;
		}

		res.status(400).send(getErrors(error));
	}
	res.status(404).send(INVALID_ID_RESPONSE);
};

const deleteCourse = (req, res) => {
	const {index} = getCourseById(+req.params.id);

	if (index >= 0) {
		const course = courses.splice(index, 1);
		res.status(200).send(course);
		return;
	}

	res.status(400).send(INVALID_ID_RESPONSE);
};

exports.local = {
	getCourses,
	getCourse,
	createCourse,
	updateCourse,
	deleteCourse
};
