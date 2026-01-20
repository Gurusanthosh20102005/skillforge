const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Course = sequelize.define('Course', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    difficultyLevel: {
        type: DataTypes.ENUM('Beginner', 'Intermediate', 'Advanced'),
        defaultValue: 'Beginner',
    },
    instructorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Course.belongsTo(User, { foreignKey: 'instructorId', as: 'instructor' });
User.hasMany(Course, { foreignKey: 'instructorId' });

module.exports = Course;
