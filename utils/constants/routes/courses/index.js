exports.courseRoutes = {
	local: {
		getCourses: '/local/',
		getCourse: '/local/:id',
		createCourse: '/local/',
		updateCourse: '/local/:id',
		deleteCourse: '/local/:id'
	},
	db: {
		getCourses: '/db/',
		getCourse: '/db/:id',
		createCourse: '/db/',
		updateCourse: '/db/:id',
		deleteCourse: '/db/:id'
	}
};
