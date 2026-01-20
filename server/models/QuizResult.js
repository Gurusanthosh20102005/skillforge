const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Quiz = require('./Quiz');

const QuizResult = sequelize.define('QuizResult', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: undefined, // Removed to fix sync order
    },
    quizId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: undefined, // Removed to fix sync order
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    totalQuestions: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    answers: {
        type: DataTypes.JSON, // Stores the student's selected answers
    }
});

QuizResult.belongsTo(User, { foreignKey: 'studentId' });
QuizResult.belongsTo(Quiz, { foreignKey: 'quizId' });
User.hasMany(QuizResult, { foreignKey: 'studentId' });
Quiz.hasMany(QuizResult, { foreignKey: 'quizId' });

module.exports = QuizResult;
