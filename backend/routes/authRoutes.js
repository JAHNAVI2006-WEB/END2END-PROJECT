const express = require("express");
const router = express.Router();
const {
    signup,
    login,
    getProfile,
    updateProfile,
    logout,
    forgotPassword,
    getAllUsers
} = require("../controllers/authController");

// Public routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);

// Protected routes (require authentication)
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.post("/logout", logout);

// Admin routes (require admin privileges)
router.get("/users", getAllUsers);

module.exports = router;
