const express = require('express');
const router = express.Router();
const revenueController = require('../controllers/revenueController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Ottieni tutte le entrate
router.get('/', authenticateToken, authorizeRoles('admin', 'manager'), revenueController.getAllRevenues);

// Ottieni una singola entrata
router.get('/:id', authenticateToken, authorizeRoles('admin', 'manager'), revenueController.getRevenueById);

// Crea una nuova entrata
router.post('/', authenticateToken, authorizeRoles('admin'), revenueController.createRevenue);

// Aggiorna un'entrata esistente
router.put('/:id', authenticateToken, authorizeRoles('admin'), revenueController.updateRevenue);

// Elimina un'entrata
router.delete('/:id', authenticateToken, authorizeRoles('admin'), revenueController.deleteRevenue);

module.exports = router;
