const sequelize = require('./config/db');

console.log('Testing DB connection...');
sequelize.authenticate()
    .then(() => {
        console.log('Connection established successfully.');
        return sequelize.close();
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
