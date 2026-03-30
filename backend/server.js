
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const interviewRoutes = require("./routes/interviewRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:8001",
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: "Too many requests from this IP, please try again after 15 minutes"
  }
});
app.use('/api/', limiter);

// Logging
app.use(morgan('combined'));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/interview", interviewRoutes);
app.use("/api/auth", authRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    name: "Smart Interview Companion API",
    version: "1.0.0",
    description: "Backend API for mock interview practices with authentication",
    endpoints: {
      "Authentication": {
        "POST /api/auth/signup": "Register new user",
        "POST /api/auth/login": "Login user",
        "POST /api/auth/logout": "Logout user",
        "GET /api/auth/profile": "Get user profile",
        "PUT /api/auth/profile": "Update user profile",
        "POST /api/auth/forgot-password": "Forgot password"
      },
      "Interview": {
        "POST /api/interview": "Handle interview responses and get AI feedback",
        "GET /api/interview/questions": "Get questions for specific domain",
        "GET /api/interview/domains": "Get all available domains",
        "GET /api/interview/questions/:domain/:questionId": "Get specific question by ID",
        "POST /api/interview/random-questions": "Get random questions from multiple domains"
      }
    },
    parameters: {
      "course": "Domain/technology (javascript, react, java, python, etc.)",
      "count": "Number of questions to return (default: 5)",
      "difficulty": "Filter by difficulty (easy, medium, hard)",
      "category": "Filter by category"
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `Cannot ${req.method} ${req.originalUrl}`,
    availableEndpoints: [
      "GET /api",
      "GET /health",
      "Authentication Endpoints:",
      "POST /api/auth/signup",
      "POST /api/auth/login", 
      "POST /api/auth/logout",
      "GET /api/auth/profile",
      "PUT /api/auth/profile",
      "POST /api/auth/forgot-password",
      "Interview Endpoints:",
      "POST /api/interview",
      "GET /api/interview/questions",
      "GET /api/interview/domains",
      "GET /api/interview/questions/:domain/:questionId",
      "POST /api/interview/random-questions"
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api`);
  console.log(`💚 Health Check: http://localhost:${PORT}/health`);
  console.log(`🔐 Authentication endpoints available at /api/auth`);
});
