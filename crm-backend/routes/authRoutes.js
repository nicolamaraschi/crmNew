const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Registrazione di un nuovo utente
router.post('/register', authController.registerUser);

// Login di un utente
router.post('/login', authController.loginUser);

module.exports = router;
