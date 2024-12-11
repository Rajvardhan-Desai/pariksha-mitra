require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Connect to MongoDB
// Remove deprecated options in Mongoose 6+
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Example API route
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Serve static files from the React frontend
// Adjust the path to your `dist` folder if needed
// If your server structure is:
// server/
//   index.js
//   dist/
//     index.html
//
// Then using `path.join(__dirname, 'dist')` should work.
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback: for any route not handled by API, serve the index.html file
app.get('*', (req, res) => {
  // If `dist` is at server/dist/index.html:
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
