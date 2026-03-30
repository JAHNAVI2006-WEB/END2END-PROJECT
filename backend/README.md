# Smart Interview Companion - Backend API

A comprehensive backend system for mock interview practices supporting multiple technologies and development roles.

## 🚀 Features

### **Supported Technologies & Domains**

#### **Frontend Technologies**
- **JavaScript** - ES6+, async programming, DOM manipulation, event handling
- **React** - Components, hooks, state management, optimization
- **Node.js** - Runtime, event loop, streams, clustering
- **Express.js** - Routing, middleware, authentication, security

#### **Backend Technologies**  
- **Java** - OOP, collections, multithreading, garbage collection
- **Python** - Data structures, decorators, generators, memory management
- **SQL** - Queries, joins, indexing, transactions, security

#### **Development Roles**
- **Frontend Developer** - UI/UX, responsive design, performance, accessibility
- **Backend Developer** - APIs, databases, security, scalability
- **DevOps Engineer** - CI/CD, containers, infrastructure, monitoring

### **Question Categories**
- **Difficulty Levels**: Easy, Medium, Hard
- **Categories**: Basics, Advanced, Performance, Security, Architecture, etc.
- **Expected Answers**: Comprehensive reference answers for evaluation

## 📡 API Endpoints

### **Core Interview Endpoints**

#### `POST /api/interview`
Handle interview responses and get AI feedback
```json
{
  "text": "User's answer",
  "domain": "javascript",
  "questionNumber": 1
}
```

#### `GET /api/interview/questions`
Get questions for specific domain
```
/api/interview/questions?course=javascript&count=5&difficulty=medium&category=functions
```

#### `GET /api/interview/domains`
Get all available domains with categorization
```json
{
  "domains": [
    {
      "category": "Frontend Technologies",
      "technologies": ["javascript", "react", "nodejs", "express", "frontend"]
    },
    {
      "category": "Backend Technologies", 
      "technologies": ["java", "python", "backend", "sql"]
    },
    {
      "category": "Development Roles",
      "technologies": ["devops"]
    }
  ]
}
```

#### `GET /api/interview/questions/:domain/:questionId`
Get specific question by ID
```
/api/interview/questions/javascript/3
```

#### `POST /api/interview/random-questions`
Get random questions from multiple domains
```json
{
  "domains": ["javascript", "react", "java"],
  "count": 10,
  "difficulty": "medium"
}
```

### **Utility Endpoints**

#### `GET /api`
API documentation and available endpoints
#### `GET /health`
Health check and server status

## 🛠️ Installation & Setup

### **Prerequisites**
- Node.js 16+
- npm or yarn
- MongoDB (optional, for data persistence)

### **Steps**

1. **Clone the repository**
```bash
git clone <repository-url>
cd smart-interview-companion/backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment configuration**
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configuration
nano .env
```

4. **Start the server**
```bash
# Development mode
npm run dev

# Production mode  
npm start
```

## ⚙️ Configuration

### **Environment Variables**

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment mode | development |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:8001 |
| `AI_SERVICE_URL` | AI analysis service URL | http://localhost:8000 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/smart-interview |
| `JWT_SECRET` | JWT signing secret | your-secret-key |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | 900000 |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 |

## 🔒 Security Features

- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Prevent abuse
- **Input Validation** - Request validation
- **Error Handling** - Secure error responses

## 📊 Response Examples

### **Get Questions Response**
```json
{
  "questions": [
    {
      "id": 1,
      "question": "What is the difference between undefined and null in JavaScript?",
      "difficulty": "easy",
      "category": "basics",
      "expectedAnswer": "undefined means a variable has been declared but not assigned a value..."
    }
  ],
  "courseMatched": "javascript",
  "totalAvailable": 10,
  "requestedCount": 5,
  "actualCount": 5
}
```

### **Interview Analysis Response**
```json
{
  "sentiment": "positive",
  "aiResponse": "Great explanation! You covered the key points about undefined vs null...",
  "feedback": {
    "technical": "excellent",
    "communication": "good",
    "completeness": "very good"
  },
  "score": 85,
  "nextQuestion": {
    "id": 2,
    "question": "Can you explain closures in JavaScript?"
  }
}
```

## 🧪 Testing

### **Run Tests**
```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- --grep "interview"
```

### **API Testing Examples**

Using curl:
```bash
# Get domains
curl http://localhost:5000/api/interview/domains

# Get JavaScript questions
curl "http://localhost:5000/api/interview/questions?course=javascript&count=3"

# Submit interview response
curl -X POST http://localhost:5000/api/interview \
  -H "Content-Type: application/json" \
  -d '{"text":"My answer","domain":"javascript","questionNumber":1}'
```

## 📝 Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with nodemon |
| `npm test` | Run test suite |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## 🚀 Deployment

### **Development**
```bash
npm run dev
```

### **Production**
```bash
# Build
npm run build

# Start
NODE_ENV=production npm start
```

### **Docker**
```bash
# Build image
docker build -t smart-interview-backend .

# Run container
docker run -p 5000:5000 --env-file .env smart-interview-backend
```

## 📚 Question Bank Structure

Each question includes:
- **Question text** - The actual interview question
- **Difficulty** - Easy, Medium, or Hard
- **Category** - Topic area (basics, advanced, security, etc.)
- **Expected Answer** - Comprehensive reference answer for evaluation

### **Adding New Questions**

Questions are stored in `controllers/interviewController.js` in the `INTERVIEW_QUESTIONS` object:

```javascript
domain: [
  {
    question: "Your question here",
    difficulty: "easy|medium|hard",
    category: "category-name",
    expectedAnswer: "Comprehensive expected answer..."
  }
]
```

## 🔧 Development

### **Project Structure**
```
backend/
├── controllers/
│   └── interviewController.js    # Main interview logic
├── routes/
│   └── interviewRoutes.js       # API routes
├── package.json               # Dependencies and scripts
├── server.js                  # Express server setup
├── .env.example              # Environment template
└── README.md                 # This file
```

### **Adding New Endpoints**

1. Add controller function in `controllers/interviewController.js`
2. Add route in `routes/interviewRoutes.js`
3. Update API documentation in `server.js`
4. Add tests
5. Update this README

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
- Create an issue in the repository
- Check API documentation at `http://localhost:5000/api`
- Health check at `http://localhost:5000/health`

---

**🎯 Ready for comprehensive mock interview practices across multiple technologies!**
