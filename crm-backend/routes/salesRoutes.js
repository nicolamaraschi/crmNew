const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');
const debug = require('debug')('app:salesRoutes');

// Ottieni tutte le vendite
router.get('/', authenticateToken, authorizeRoles('admin', 'manager'), (req, res, next) => {
  debug('GET /api/sales');
  salesController.getAllSales(req, res).catch(next);
});

// Ottieni una vendita singola
router.get('/:id', authenticateToken, authorizeRoles('admin', 'manager'), (req, res, next) => {
  debug('GET /api/sales/:id with id:', req.params.id);
  salesController.getSaleById(req, res).catch(next);
});

// Crea una nuova vendita
router.post('/', authenticateToken, authorizeRoles('admin'), (req, res, next) => {
  debug('POST /api/sales with data:', req.body);
  salesController.createSale(req, res).catch(next);
});

// Aggiorna una vendita esistente
router.put('/:id', authenticateToken, authorizeRoles('admin'), (req, res, next) => {
  debug('PUT /api/sales/:id with id:', req.params.id, 'and data:', req.body);
  salesController.updateSale(req, res).catch(next);
});

// Elimina una vendita
router.delete('/:id', authenticateToken, authorizeRoles('admin'), (req, res, next) => {
  debug('DELETE /api/sales/:id with id:', req.params.id);
  salesController.deleteSale(req, res).catch(next);
});

module.exports = router;
