const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Ottieni tutte le aziende
router.get('/', authenticateToken, authorizeRoles('admin', 'manager'), companyController.getAllCompanies);

// Ottieni una singola azienda
router.get('/:id', authenticateToken, authorizeRoles('admin', 'manager'), companyController.getCompanyById);

// Crea una nuova azienda
router.post('/', authenticateToken, authorizeRoles('admin'), companyController.createCompany);

// Aggiorna un'azienda esistente
router.put('/:id', authenticateToken, authorizeRoles('admin'), companyController.updateCompany);

// Elimina un'azienda
router.delete('/:id', authenticateToken, authorizeRoles('admin'), companyController.deleteCompany);

module.exports = router;
