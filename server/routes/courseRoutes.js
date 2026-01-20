const express = require('express');
const { createCourse, getCourses, getCourseById, deleteCourse, addContent } = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, authorize('instructor'), createCourse);
router.get('/', protect, getCourses); // Adjust logic for student vs instructor
router.get('/:id', protect, getCourseById);
router.delete('/:id', protect, authorize('instructor'), deleteCourse);
router.post('/:id/content', protect, authorize('instructor'), addContent);

module.exports = router;
