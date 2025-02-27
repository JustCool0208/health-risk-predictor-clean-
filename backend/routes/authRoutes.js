const express = require('express');
const { signup, login } = require('../controllers/authController');
const router = express.Router();

// Routes for signup and login
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
