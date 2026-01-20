const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const { Op } = require('sequelize');

exports.enrollCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const existingEnrollment = await Enrollment.findOne({
            where: {
                studentId: req.user.id,
                courseId: courseId
            }
        });

        if (existingEnrollment) {
            return res.status(400).json({ message: 'Already enrolled in this course' });
        }

        const enrollment = await Enrollment.create({
            studentId: req.user.id,
            courseId: courseId
        });

        res.status(201).json(enrollment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDashboard = async (req, res) => {
    try {
        const enrollments = await Enrollment.findAll({
            where: { studentId: req.user.id },
            include: [{ model: Course }]
        });
        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getRecommendations = async (req, res) => {
    try {
        // Simple Heuristic:
        // 1. Get all completed courses.
        // 2. If completed 'Beginner', suggest 'Intermediate'.
        // 3. If no courses, suggest 'Beginner'.

        const completedEnrollments = await Enrollment.findAll({
            where: {
                studentId: req.user.id,
                completed: true
            },
            include: [{ model: Course }]
        });

        let difficultyToSuggest = 'Beginner';

        // Check if user has mastered Beginner
        const hasBeginner = completedEnrollments.some(e => e.Course.difficultyLevel === 'Beginner');
        const hasIntermediate = completedEnrollments.some(e => e.Course.difficultyLevel === 'Intermediate');

        if (hasBeginner) difficultyToSuggest = 'Intermediate';
        if (hasIntermediate) difficultyToSuggest = 'Advanced';

        // Find courses of that level that user is NOT enrolled in
        const enrolleddCourseIds = (await Enrollment.findAll({
            where: { studentId: req.user.id },
            attributes: ['courseId']
        })).map(e => e.courseId);

        const recommendations = await Course.findAll({
            where: {
                difficultyLevel: difficultyToSuggest,
                id: { [Op.notIn]: enrolleddCourseIds }
            },
            limit: 3
        });

        // If no recommendations (e.g., all intermediate taken), fall back to any not taken
        if (recommendations.length === 0) {
            const fallback = await Course.findAll({
                where: {
                    id: { [Op.notIn]: enrolleddCourseIds }
                },
                limit: 3
            });
            return res.json(fallback);
        }

        res.json(recommendations);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProgress = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { progress, completed } = req.body;

        const enrollment = await Enrollment.findOne({
            where: { studentId: req.user.id, courseId }
        });

        if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });

        if (progress !== undefined) enrollment.progress = progress;
        if (completed !== undefined) enrollment.completed = completed;

        await enrollment.save();
        res.json(enrollment);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
