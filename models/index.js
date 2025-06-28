const sequelize = require('../config/db');
const User = require('./user');

const db = {};
db.sequelize = sequelize;
db.User = User;

async function syncDB() {
    try {
        await sequelize.authenticate();
        console.log('DB connection successful.');
        await sequelize.sync({ alter: true }); // use { force: true } to drop tables & recreate
        console.log('All models synced.');
    } catch (err) {
        console.error('DB connection error:', err);
    }
}
module.exports = { db, syncDB, User };
