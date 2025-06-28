// const sequelize = require('../config/db');
// const User = require('./users');

// const db = {};
// db.sequelize = sequelize;
// db.User = User;

// async function syncDB() {
//     try {
//         await sequelize.authenticate();
//         console.log('DB connection successful.');
//         await sequelize.sync({ alter: true }); // use { force: true } to drop tables & recreate
//         console.log('All models synced.');
//     } catch (err) {
//         console.error('DB connection error:', err);
//     }
// }
// module.exports = { db, syncDB, User };









const Users = require('./users');
const Files = require('./files');

// Define associations between User and File
Users.hasMany(Files, { foreignKey: 'userId', as: 'Files' });  // A user can have many files
Files.belongsTo(Users, { foreignKey: 'userId', as: 'Users' });  // A file belongs to a user

module.exports = { Users, Files };


