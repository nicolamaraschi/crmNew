const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');

// Ottieni tutti gli utenti
router.get('/', authenticateToken, isAdmin, userController.getAllUsers);

// Ottieni un singolo utente
router.get('/:id', authenticateToken, isAdmin, userController.getUserById);

// Crea un nuovo utente
router.post('/', authenticateToken, isAdmin, userController.createUser);

// Aggiorna un utente esistente
router.put('/:id', authenticateToken, isAdmin, userController.updateUser);

// Elimina un utente
router.delete('/:id', authenticateToken, isAdmin, userController.deleteUser);

module.exports = router;
