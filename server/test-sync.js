const sequelize = require('./config/db');
require('./models');

console.log('Starting Sync Test...');
sequelize.sync({ alter: true, logging: false })
    .then(() => {
        console.log('Sync complete!');
        process.exit(0);
    })
    .catch(err => {
        console.error('Sync failed MESSAGE:', err.message);
        console.error('Sync failed FULL:', JSON.stringify(err, null, 2));
        process.exit(1);
    });
