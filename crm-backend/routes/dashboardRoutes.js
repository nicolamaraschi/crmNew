const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Ottieni i dati principali del dashboard
router.get('/', authenticateToken, dashboardController.getDashboardData);

// Ottieni il riassunto delle entrate totali e media mensile
router.get('/revenues-summary', authenticateToken, dashboardController.getRevenueSummary);

// Ottieni le vendite mensili per l'anno in corso
router.get('/sales-monthly', authenticateToken, dashboardController.getMonthlySales);

// Ottieni il numero di nuove opportunità create mensilmente
router.get('/opportunities-monthly', authenticateToken, dashboardController.getMonthlyOpportunities);

// Ottieni i top clienti per entrate
router.get('/top-customers', authenticateToken, dashboardController.getTopCustomers);

// Ottieni lo stato delle opportunità (stage)
router.get('/opportunities-status', authenticateToken, dashboardController.getOpportunitiesByStatus);

module.exports = router;
