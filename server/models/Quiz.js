const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Course = require('./Course');

const Quiz = sequelize.define('Quiz', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    topic: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    difficulty: {
        type: DataTypes.ENUM('Beginner', 'Intermediate', 'Advanced'),
        defaultValue: 'Beginner',
    },
    timer: {
        type: DataTypes.INTEGER, // Duration in minutes
        defaultValue: 10,
    },
    questions: {
        type: DataTypes.JSON, // Stores the array of questions
        allowNull: false,
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: undefined, // Removed to fix sync order
    },
});

Quiz.belongsTo(Course, { foreignKey: 'courseId' });
Course.hasMany(Quiz, { foreignKey: 'courseId' });

module.exports = Quiz;
