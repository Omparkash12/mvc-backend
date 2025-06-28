const sequelize = require('../config/db');

async function syncDB() {
    try {
        await sequelize.authenticate();
        console.log('DB connection successful.');
        await sequelize.sync({ alter: true }); // Sync the models (use { force: true } to drop & recreate tables)
        console.log('All models synced.');
    } catch (err) {
        console.error('DB connection error:', err);
    }
}

module.exports = syncDB;
