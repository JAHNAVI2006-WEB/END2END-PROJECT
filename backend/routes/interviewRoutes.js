
const express = require("express");
const router = express.Router();
const { 
  handleInterview, 
  getQuestions, 
  getDomains,
  getQuestionById,
  getRandomQuestions 
} = require("../controllers/interviewController");

// Original routes
router.post("/", handleInterview);
router.get("/questions", getQuestions);

// New enhanced routes
router.get("/domains", getDomains);
router.get("/questions/:domain/:questionId", getQuestionById);
router.post("/random-questions", getRandomQuestions);

module.exports = router;
