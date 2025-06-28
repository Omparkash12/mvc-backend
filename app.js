const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');
const productRoutes = require('./routes/productRoutes');
const userEmitter = require('./events/userEvents');
const productEmitter = require('./events/productEvents');
const fileRoutes = require('./routes/fileRoutes'); 

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/files', fileRoutes);

// Error handling middleware goes LAST
app.use(errorHandler);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});

// Listen for the 'productsSynced' event
productEmitter.on('productsSynced', (count) => {
  console.log(`✅ [Event] ${count} products have been successfully synced to the database.`);
  // You can also send email notifications or trigger other actions here
});

// Listen for the 'userEmitter' event
userEmitter.on('userEmitter', (data) => {
  const { eventType, user } = data;

  if (eventType === 'signup') {
    console.log(`✅ [Event] A new user signed up with the following details: ${JSON.stringify(user)}`);
    // Perform additional actions like sending a welcome email
  } else if (eventType === 'login') {
    console.log(`✅ [Event] User logged in with the following details: ${JSON.stringify(user)}`);
    // Perform additional actions like logging user activity
  }
});

module.exports = app;
