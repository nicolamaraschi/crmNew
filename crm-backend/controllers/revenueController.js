const Revenue = require('../models/revenueModel');

// GET all revenues
exports.getAllRevenues = async (req, res) => {
  try {
    const revenues = await Revenue.find();
    res.status(200).json(revenues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET a single revenue
exports.getRevenueById = async (req, res) => {
  try {
    const revenue = await Revenue.findById(req.params.id);
    if (!revenue) return res.status(404).json({ message: 'Revenue not found' });
    res.status(200).json(revenue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST a new revenue
exports.createRevenue = async (req, res) => {
  const revenue = new Revenue(req.body);
  try {
    const newRevenue = await revenue.save();
    res.status(201).json(newRevenue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT update a revenue
exports.updateRevenue = async (req, res) => {
  try {
    const revenue = await Revenue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!revenue) return res.status(404).json({ message: 'Revenue not found' });
    res.status(200).json(revenue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a revenue
exports.deleteRevenue = async (req, res) => {
  try {
    const revenue = await Revenue.findByIdAndDelete(req.params.id);
    if (!revenue) return res.status(404).json({ message: 'Revenue not found' });
    res.status(200).json({ message: 'Revenue deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
