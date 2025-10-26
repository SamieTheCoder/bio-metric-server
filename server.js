const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const deviceRoutes = require('./routes/deviceRoutes');
const userRoutes = require('./routes/userRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health Check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'ESSL Biometric Server for Trackyfy',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      devices: '/api/devices',
      users: '/api/users',
      attendance: '/api/attendance'
    }
  });
});

// Routes
app.use('/api/devices', deviceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/attendance', attendanceRoutes);

// Error Handler
app.use(errorHandler);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 ESSL Biometric Server running on port ${PORT}`);
  console.log(`📡 Server URL: http://localhost:${PORT}`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
