const {coursesModel} = require('../../models/courses');
const {modelUtils} = require('../../utils/models');

const createCourse = async(req, res) => {
	if (req.method === 'GET') {
		res.render('courses/create', {message: null, errors: null});
		return;
	}

	try {
		await coursesModel.create(req.body);
		res.render('courses/create', ({message: 'coursed added successfully', errors: null}));
	} catch (err) {
		res.status(400).render('courses/create', ({message: null, errors: modelUtils.extractErrorMessages(err.errors)}));
	}
};

const getCourse = async(req, res) => {
	try {
		const course = await coursesModel.findByPk(req.params.id);

		if (!course) {
			res.status(404).render({error: 'No course found with given id'});
			return;
		}

		res.status(200).render('courses/get', {
			course, error: null, edit: !!req?.query?.edit, message: null
		});
	} catch (err) {
		res.status(400).render({error: modelUtils.extractErrorMessages(err.errors), edit: !!req?.query?.edit, message: null});
	}
};

const getCourses = async(req, res) => {
	let {perPage, page} = req.query;
	perPage = (+perPage || 10);
	page = (+page || 1);

	const total = await coursesModel.count();
	const courses = await coursesModel.findAll({limit: perPage, offset: perPage * (page - 1)});
	res.render('courses/list', {
		total, perPage, page, courses
	});
};

const updateCourse = async(req, res) => {
	try {
		const course = await coursesModel.findByPk(req.params.id);
		if (!course) {
			res.status(404).json({error: 'No course found with given id'});
			return;
		}

		await course.update({...req.body});

		res.status(200).json(course);
	} catch (err) {
		res.status(404).json(modelUtils.extractErrorMessages(err.errors));
	}
};

const deleteCourse = async(req, res) => {
	try {
		const deletedCourse = await coursesModel.findByPk(req.params.id);
		if (!deletedCourse) {
			res.status(404).json({error: 'No course found with given id'});
			return;
		}
		deletedCourse.destroy();

		res.status(200).json(deletedCourse);
	} catch (err) {
		res.status(404).json(modelUtils.extractErrorMessages(err.errors));
	}
};

exports.courseViews = {
	createCourse,
	getCourse,
	getCourses,
	updateCourse,
	deleteCourse
};
