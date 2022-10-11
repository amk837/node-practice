const {coursesModel} = require('../../../models/courses');
const {modelUtils} = require('../../../utils/models');

const createCourse = async(req, res) => {
	try {
		const course = await coursesModel.create(req.body);
		res.status(200).send(course);
	} catch (err) {
		res.status(400).send({errors: modelUtils.extractErrorMessages(err.errors)});
	}
};

const getCourse = async(req, res) => {
	try {
		const course = await coursesModel.findByPk(req.params.id);

		if (!course) {
			res.status(404).send({error: 'No course found with given id'});
			return;
		}
		res.status(200).send(course);
	} catch (err) {
		res.status(404).send({errors: modelUtils.extractErrorMessages(err.errors)});
	}
};

const getCourses = async(req, res) => {
	let {perPage, page} = req.query;
	perPage = (+perPage || 10);
	page = (+page || 1);

	const total = await coursesModel.count();
	const courses = await coursesModel.findAll({limit: perPage * page, offset: perPage * (page - 1)});
	res.status(200).send({
		total, page, perPage, courses
	});
};

const updateCourse = async(req, res) => {
	try {
		const course = await coursesModel.findByPk(req.params.id);
		if (!course) {
			res.status(404).send({error: 'No course found with given id'});
			return;
		}

		await course.update({...req.body});

		res.status(200).send(course);
	} catch (err) {
		res.status(404).send(modelUtils.extractErrorMessages(err.errors));
	}
};

const deleteCourse = async(req, res) => {
	try {
		const deletedCourse = await coursesModel.findByPk(req.params.id);
		if (!deletedCourse) {
			res.status(404).send({error: 'No course found with given id'});
			return;
		}
		deletedCourse.destroy();

		res.status(200).send(deletedCourse);
	} catch (err) {
		res.status(404).send(modelUtils.extractErrorMessages(err.errors));
	}
};

exports.db = {
	createCourse,
	getCourse,
	getCourses,
	updateCourse,
	deleteCourse
};
