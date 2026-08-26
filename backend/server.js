const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

dotenv.config();

// Connect Database with error handling
connectDB().catch((err) => {
  console.error("❌ MongoDB Connection Error:", err.message);
});

const app = express();

// Render environment PORT or fallback
const PORT = process.env.PORT || 10000;

// CORS Config
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
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Test / Health Route (Render isse check karta hai)
app.get('/', (req, res) => {
  res.status(200).send('Ishika Tour & Travels API is Live & Running...');
});

// Main API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tours', require('./routes/tourRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Start Server listening on 0.0.0.0
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});