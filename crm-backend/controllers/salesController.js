const debug = require('debug')('app:salesController');
const Sales = require('../models/salesModel');

// GET all sales
exports.getAllSales = async (req, res) => {
  debug('Invoking getAllSales');
  try {
    const sales = await Sales.find();
    debug('Sales retrieved:', sales);
    res.status(200).json(sales);
  } catch (error) {
    debug('Error retrieving sales:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// GET a single sale
exports.getSaleById = async (req, res) => {
  debug('Invoking getSaleById with id:', req.params.id);
  try {
    const sale = await Sales.findById(req.params.id);
    if (!sale) {
      debug('Sale not found');
      return res.status(404).json({ message: 'Sale not found' });
    }
    debug('Sale retrieved:', sale);
    res.status(200).json(sale);
  } catch (error) {
    debug('Error retrieving sale:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// POST a new sale
exports.createSale = async (req, res) => {
  debug('Invoking createSale with data:', req.body);
  const sale = new Sales(req.body);
  try {
    const newSale = await sale.save();
    debug('Sale created:', newSale);
    res.status(201).json(newSale);
  } catch (error) {
    debug('Error creating sale:', error.message);
    res.status(400).json({ message: error.message });
  }
};

// PUT update a sale
exports.updateSale = async (req, res) => {
  debug('Invoking updateSale with id:', req.params.id, 'and data:', req.body);
  try {
    const sale = await Sales.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!sale) {
      debug('Sale not found');
      return res.status(404).json({ message: 'Sale not found' });
    }
    debug('Sale updated:', sale);
    res.status(200).json(sale);
  } catch (error) {
    debug('Error updating sale:', error.message);
    res.status(400).json({ message: error.message });
  }
};

// DELETE a sale
exports.deleteSale = async (req, res) => {
  debug('Invoking deleteSale with id:', req.params.id);
  try {
    const sale = await Sales.findByIdAndDelete(req.params.id);
    if (!sale) {
      debug('Sale not found');
      return res.status(404).json({ message: 'Sale not found' });
    }
    debug('Sale deleted:', sale);
    res.status(200).json({ message: 'Sale deleted' });
  } catch (error) {
    debug('Error deleting sale:', error.message);
    res.status(500).json({ message: error.message });
  }
};
