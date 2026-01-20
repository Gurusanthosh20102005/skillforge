const express = require('express');
const { enrollCourse, getDashboard, getRecommendations, updateProgress } = require('../controllers/studentController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(protect);
router.use(authorize('student'));

router.post('/enroll/:courseId', enrollCourse);
router.get('/dashboard', getDashboard);
router.get('/recommendations', getRecommendations);
router.put('/progress/:courseId', updateProgress);

module.exports = router;
