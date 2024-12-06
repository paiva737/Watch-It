const express = require("express");
const { login } = require("../controllers/authController"); // Controlador de login
const { register } = require("../controllers/authController");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { getProfile } = require("../controllers/profileController");

const router = express.Router();

// Rota para login
router.post("/login", login);
router.post("/register", register);
router.get("/profile", authenticateToken, getProfile);
module.exports = router;
