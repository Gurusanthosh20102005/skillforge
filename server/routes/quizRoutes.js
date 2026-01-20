const express = require('express');
const { generateQuiz, saveQuiz, getQuizzes, getQuizById, submitQuiz, getMyResults, getSuggestions, deleteQuiz } = require('../controllers/quizController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/generate', protect, authorize('instructor'), generateQuiz);
router.post('/', protect, authorize('instructor'), saveQuiz);
router.get('/course/:courseId', protect, getQuizzes);

router.get('/suggestions', protect, authorize('student'), getSuggestions); // New Adaptive Route
router.delete('/:id', protect, authorize('instructor'), deleteQuiz); // Delete Quiz
router.get('/my-results', protect, authorize('student'), getMyResults);
router.get('/:id', protect, getQuizById);
router.post('/:quizId/submit', protect, authorize('student'), submitQuiz);

module.exports = router;
