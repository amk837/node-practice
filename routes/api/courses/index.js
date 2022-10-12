const express = require('express');
const {courses: {local: localControllers, db}} = require('../../../controller/courses');
const {routes: {courseRoutes}} = require('../../../utils/constants/routes');

const router = express.Router();

// local routes
router.get(courseRoutes.local.getCourses, localControllers.getCourses);

router.get(courseRoutes.local.getCourse, localControllers.getCourse);

router.post(courseRoutes.local.createCourse, localControllers.createCourse);

router.put(courseRoutes.local.updateCourse, localControllers.updateCourse);

router.delete(courseRoutes.local.deleteCourse, localControllers.deleteCourse);

// db routes
router.get(courseRoutes.db.getCourses, db.getCourses);

router.get(courseRoutes.db.getCourse, db.getCourse);

router.post(courseRoutes.db.createCourse, db.createCourse);

router.put(courseRoutes.db.updateCourse, db.updateCourse);

router.delete(courseRoutes.db.deleteCourse, db.deleteCourse);

exports.coursesRouter = router;
