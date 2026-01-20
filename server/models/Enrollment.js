const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Course = require('./Course');

const Enrollment = sequelize.define('Enrollment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    studentId: {
        type: DataTypes.INTEGER,
        references: undefined, // Removed to fix sync order
    },
    courseId: {
        type: DataTypes.INTEGER,
        references: undefined, // Removed to fix sync order
    },
    progress: {
        type: DataTypes.FLOAT, // Percentage (0-100)
        defaultValue: 0,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    currentScore: {
        type: DataTypes.INTEGER,
        defaultValue: 0, // Used for adaptive logic
    }
});

Enrollment.belongsTo(User, { foreignKey: 'studentId' });
Enrollment.belongsTo(Course, { foreignKey: 'courseId' });
User.hasMany(Enrollment, { foreignKey: 'studentId' });
Course.hasMany(Enrollment, { foreignKey: 'courseId' });

module.exports = Enrollment;
