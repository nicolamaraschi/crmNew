const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController'); // Assicurati che il percorso sia corretto
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Ottieni tutti i contatti
router.get('/', authenticateToken, authorizeRoles('admin', 'manager'), contactController.getAllContacts);

// Ottieni un singolo contatto
router.get('/:id', authenticateToken, authorizeRoles('admin', 'manager'), contactController.getContactById);

// Crea un nuovo contatto
router.post('/', authenticateToken, authorizeRoles('admin'), contactController.createContact);

// Aggiorna un contatto esistente
router.put('/:id', authenticateToken, authorizeRoles('admin'), contactController.updateContact);

// Elimina un contatto
router.delete('/:id', authenticateToken, authorizeRoles('admin'), contactController.deleteContact);

module.exports = router;
