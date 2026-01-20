const express = require('express');
const { getInstructorStats, getStudentStats } = require('../controllers/analyticsController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/instructor', protect, authorize('instructor'), getInstructorStats);
router.get('/student', protect, authorize('student'), getStudentStats);

module.exports = router;
