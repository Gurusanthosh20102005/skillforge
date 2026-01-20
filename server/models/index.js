const User = require('./User');
const Course = require('./Course');
const Content = require('./Content');
const Enrollment = require('./Enrollment');
const Quiz = require('./Quiz');
const QuizResult = require('./QuizResult');

// Define associations here if not already in files, 
// OR just ensure they are loaded so associations in files run.
// Since associations are in files, requiring them is enough.

module.exports = {
    User,
    Course,
    Content,
    Enrollment,
    Quiz,
    QuizResult
};
