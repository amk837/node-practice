const courses = [];

const getCourses = (req, res) => {
	res.send(courses);
};

const getCourse = (req, res) => {
	const course = courses.find(({id}) => id === req.body.id);
	if (course) {
		res.status(200).send(course);
	}

	res.status(404).send('No course found with given id');
};

exports.local = {
	getCourses,
	getCourse
};
