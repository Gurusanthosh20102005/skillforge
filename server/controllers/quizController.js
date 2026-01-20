const OpenAI = require('openai');
const Quiz = require('../models/Quiz');
const Course = require('../models/Course');
const QuizResult = require('../models/QuizResult');

const openai = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: 'https://api.deepseek.com',
});

exports.generateQuiz = async (req, res) => {
    try {
        const { topic, difficulty, numQuestions } = req.body;

        const prompt = `Generate a quiz on the topic "${topic}" with a difficulty level of "${difficulty}". 
    Create ${numQuestions || 5} multiple-choice questions. 
    Return the response strictly in the following JSON format:
    [
      {
        "question": "Question text here",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "answer": "Correct Option Text"
      }
    ]`;

        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are a helpful assistant that generates quizzes in JSON format." }, { role: "user", content: prompt }],
            model: "deepseek-chat",
        });

        let quizContent = completion.choices[0].message.content;

        if (quizContent.startsWith('```json')) {
            quizContent = quizContent.replace(/^```json/, '').replace(/```$/, '');
        } else if (quizContent.startsWith('```')) {
            quizContent = quizContent.replace(/^```/, '').replace(/```$/, '');
        }

        const questions = JSON.parse(quizContent);

        res.json({ topic, questions });
    } catch (error) {
        console.error('AI Generation Error:', error);
        res.status(500).json({ message: 'Failed to generate quiz', error: error.message });
    }
};

exports.saveQuiz = async (req, res) => {
    try {
        const { courseId, topic, questions, difficulty, timer } = req.body;

        const course = await Course.findOne({ where: { id: courseId, instructorId: req.user.id } });
        if (!course) {
            return res.status(404).json({ message: 'Course not found or unauthorized' });
        }

        const quiz = await Quiz.create({
            courseId,
            topic,
            questions,
            difficulty: difficulty || 'Beginner',
            timer: timer || 10
        });

        res.status(201).json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getQuizzes = async (req, res) => {
    try {
        const { courseId } = req.params;
        const quizzes = await Quiz.findAll({ where: { courseId } });
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findByPk(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        // Remove correct answers before sending to student
        const questionsForStudent = quiz.questions.map(q => ({
            question: q.question,
            options: q.options
        }));

        res.json({
            id: quiz.id,
            topic: quiz.topic,
            difficulty: quiz.difficulty,
            timer: quiz.timer,
            questions: questionsForStudent,
            courseId: quiz.courseId
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.submitQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;
        const { answers } = req.body;

        const quiz = await Quiz.findByPk(quizId);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        let score = 0;
        const questions = quiz.questions;

        questions.forEach((q, index) => {
            if (answers[index] === q.answer) {
                score++;
            }
        });

        const result = await QuizResult.create({
            studentId: req.user.id,
            quizId,
            score,
            totalQuestions: questions.length,
            answers
        });

        res.json({
            message: 'Quiz submitted successfully',
            score,
            totalQuestions: questions.length,
            resultId: result.id
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMyResults = async (req, res) => {
    try {
        const results = await QuizResult.findAll({
            where: { studentId: req.user.id },
            include: [{ model: Quiz, include: [Course] }],
            order: [['createdAt', 'DESC']]
        });
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Adaptive Learning: Suggest Content based on Performance
exports.getSuggestions = async (req, res) => {
    try {
        // Fetch recent results for the student
        const results = await QuizResult.findAll({
            where: { studentId: req.user.id },
            include: [{ model: Quiz }],
            order: [['createdAt', 'DESC']],
            limit: 5 // Analyze last 5 quizzes
        });

        if (results.length === 0) {
            return res.json({
                message: "No quiz history found.",
                suggestion: "Start with a Beginner level quiz from any course.",
                type: 'info'
            });
        }

        const lastResult = results[0];
        const percentage = (lastResult.score / lastResult.totalQuestions) * 100;
        let suggestion = {};

        if (percentage < 60) {
            suggestion = {
                text: `We noticed you struggled with ${lastResult.Quiz.topic}. We recommend reviewing the material and trying a Beginner level quiz.`,
                nextAction: 'Review & Retake',
                recommendedDifficulty: 'Beginner',
                topic: lastResult.Quiz.topic
            };
        } else if (percentage >= 60 && percentage < 85) {
            suggestion = {
                text: `Good job on ${lastResult.Quiz.topic}! You are ready for more challenges. Try an Intermediate quiz next.`,
                nextAction: 'Practice More',
                recommendedDifficulty: 'Intermediate',
                topic: lastResult.Quiz.topic
            };
        } else {
            suggestion = {
                text: `Excellent work on ${lastResult.Quiz.topic}! You've mastered this. Move on to Advanced topics.`,
                nextAction: 'Advance',
                recommendedDifficulty: 'Advanced',
                topic: lastResult.Quiz.topic
            };
        }

        res.json({ recentPerformance: percentage, suggestion });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching suggestions' });
    }
};

exports.deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByPk(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        // Verify ownership (optional but recommended: check if course belongs to instructor)
        // For now, assuming instructor role check in middleware is sufficient or we check course ownership
        const course = await Course.findByPk(quiz.courseId);
        if (course.instructorId !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to delete this quiz' });
        }

        await quiz.destroy();
        res.json({ message: 'Quiz removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
