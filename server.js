require('dotenv').config();
const app = require('./app');
const { syncDB } = require('./models');

const PORT = process.env.PORT || 3000;

syncDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

