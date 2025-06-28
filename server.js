require('dotenv').config();
const app = require('./app');
const syncDB = require('./models/sync');

const PORT = process.env.PORT || 3000;

syncDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});



// require('dotenv').config();
// const express = require('express');
// const sequelize = require('./config/db');
// const app = express();

// const PORT = process.env.PORT || 3000;

// // Sync the database
// async function syncDB() {
//     try {
//         await sequelize.authenticate();
//         console.log('DB connection successful.');
//         await sequelize.sync({ alter: true }); // Sync the models (use { force: true } to drop & recreate tables)
//         console.log('All models synced.');
//     } catch (err) {
//         console.error('DB connection error:', err);
//     }
// }

// // Run the database sync and start the server once the DB is ready
// syncDB().then(() => {
//     app.listen(PORT, () => {
//         console.log(`Server running on port ${PORT}`);
//     });
// });
