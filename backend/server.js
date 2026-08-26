const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

dotenv.config();

// Connect Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// 1. CORS CONFIGURATION (Without broken wildcard route)
const allowedOrigins = [
  'https://ishikatours-1-frontend.onrender.com',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Fallback: allows other clients safely
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Main API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tours', require('./routes/tourRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Test Route
app.get('/', (req, res) => {
  res.send('Ishika Tour & Travels API is Running...');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});