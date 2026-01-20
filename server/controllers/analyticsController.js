const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const Quiz = require('../models/Quiz');
const QuizResult = require('../models/QuizResult');
const User = require('../models/User');

exports.getInstructorStats = async (req, res) => {
    try {
        const userId = req.user.id;

        // 1. Get all courses by instructor
        const courses = await Course.findAll({
            where: { instructorId: userId },
            include: [{ model: Enrollment }]
        });

        // 2. Calculate Enrollments per Course
        const enrollmentData = courses.map(course => ({
            title: course.title,
            students: course.Enrollments.length
        }));

        // 3. Quiz Performance (Average scores per quiz)
        // Find quizzes created by this instructor's courses
        const quizzes = await Quiz.findAll({
            where: { courseId: courses.map(c => c.id) },
            include: [{ model: QuizResult }]
        });

        const quizPerformance = quizzes.map(quiz => {
            const results = quiz.QuizResults || [];
            if (results.length === 0) return { title: quiz.topic, average: 0 };

            const totalScorePercentage = results.reduce((acc, curr) => {
                return acc + (curr.score / curr.totalQuestions * 100);
            }, 0);

            return {
                title: quiz.topic,
                average: (totalScorePercentage / results.length).toFixed(2)
            };
        });

        // 4. Detailed Student Results (for Table)
        const detailedResults = [];

        // Optimize: Fetch all results with User include directly instead of nested loop if possible, 
        // but sticking to current structure to minimize refactor risk, just adding User include.
        // Actually, let's fetch results separately to easily include User.

        const allResults = await QuizResult.findAll({
            include: [
                { model: User, attributes: ['name'] },
                {
                    model: Quiz,
                    where: { courseId: courses.map(c => c.id) },
                    attributes: ['topic']
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        allResults.forEach(r => {
            detailedResults.push({
                studentId: r.studentId,
                studentName: r.User ? r.User.name : 'Unknown', // Added Name
                quizTopic: r.Quiz ? r.Quiz.topic : 'Deleted Quiz',
                score: r.score,
                total: r.totalQuestions,
                percentage: ((r.score / r.totalQuestions) * 100).toFixed(1),
                date: r.createdAt
            });
        });

        res.json({
            enrollmentData,
            quizPerformance,
            detailedResults
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.getStudentStats = async (req, res) => {
    try {
        const userId = req.user.id;

        // 1. Learning Progress (Enrollments)
        const enrollments = await Enrollment.findAll({
            where: { studentId: userId },
            include: [{ model: Course }]
        });

        const progressData = enrollments.map(e => ({
            course: e.Course.title,
            progress: e.progress
        }));

        // 2. Recent Quiz Scores (with Time and Difficulty)
        const quizResults = await QuizResult.findAll({
            where: { studentId: userId },
            include: [{ model: Quiz }],
            limit: 10, // Increased limit for trend graph
            order: [['createdAt', 'ASC']] // ASC for line graph progression
        });

        const quizScores = quizResults.map(r => ({
            quiz: r.Quiz.topic,
            score: (r.score / r.totalQuestions) * 100,
            difficulty: r.Quiz.difficulty,
            date: r.createdAt.toISOString().split('T')[0]
        }));

        res.json({
            progressData,
            quizScores
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
