const express = require('express');
const {courseViews} = require('../../views/courses');

const router = express.Router();

router.get('/', courseViews.getCourses);
router.get('/create/', courseViews.createCourse);
router.post('/create/', courseViews.createCourse);
router.get('/:id', courseViews.getCourse);
router.put('/:id', courseViews.updateCourse);
router.delete('/:id', courseViews.deleteCourse);

module.exports.coursesViewsRouter = router;