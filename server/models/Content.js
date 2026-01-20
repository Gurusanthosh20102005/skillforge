const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Course = require('./Course');

const Content = sequelize.define('Content', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('video', 'pdf', 'link'),
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Content.belongsTo(Course, { foreignKey: 'courseId' });
Course.hasMany(Content, { foreignKey: 'courseId' });

module.exports = Content;
