const sequelize = require('./config/db');

async function reset() {
    try {
        console.log('Resetting database...');
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

        // Drop tables in dependency order (though FK checks 0 should allow any)
        await sequelize.query('DROP TABLE IF EXISTS QuizResults');
        await sequelize.query('DROP TABLE IF EXISTS Quizzes');
        await sequelize.query('DROP TABLE IF EXISTS Contents');
        await sequelize.query('DROP TABLE IF EXISTS Enrollments');
        await sequelize.query('DROP TABLE IF EXISTS Courses');
        await sequelize.query('DROP TABLE IF EXISTS Users');

        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        console.log('Database reset complete');
    } catch (error) {
        console.error('Reset failed:', error);
    } finally {
        await sequelize.close();
    }
}

reset();
