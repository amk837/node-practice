const express = require('express');
const {courses: {local: localControllers}} = require('../../controller/courses');
const {routes: {courseRoutes: {local}}} = require('../../utils/constants/routes');

const router = express.Router();

router.get(local.getCourses, localControllers.getCourses);

router.get(local.getCourse, localControllers.getCourse);

router.post(local.createCourse, localControllers.createCourse);

router.put(local.updateCourse, localControllers.updateCourse);

router.delete(local.deleteCourse, localControllers.deleteCourse);

exports.coursesRouter = router;