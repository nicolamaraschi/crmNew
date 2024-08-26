const express = require('express');
const router = express.Router();
const opportunityController = require('../controllers/opportunityController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Ottieni tutte le opportunità
router.get('/', authenticateToken, authorizeRoles('admin', 'manager'), opportunityController.getAllOpportunities);

// Ottieni un'opportunità specifica
router.get('/:id', authenticateToken, authorizeRoles('admin', 'manager'), opportunityController.getOpportunityById);

// Crea una nuova opportunità
router.post('/', authenticateToken, authorizeRoles('admin'), opportunityController.createOpportunity);

// Aggiorna un'opportunità esistente
router.put('/:id', authenticateToken, authorizeRoles('admin'), opportunityController.updateOpportunity);

// Elimina un'opportunità
router.delete('/:id', authenticateToken, authorizeRoles('admin'), opportunityController.deleteOpportunity);

module.exports = router;
