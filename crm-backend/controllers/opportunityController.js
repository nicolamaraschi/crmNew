const Opportunity = require('../models/opportunityModel');

// GET all opportunities
exports.getAllOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find().populate('companyId').populate('assigned_to');
    res.status(200).json(opportunities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET a single opportunity
exports.getOpportunityById = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id).populate('companyId').populate('assigned_to');
    if (!opportunity) return res.status(404).json({ message: 'Opportunity not found' });
    res.status(200).json(opportunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST a new opportunity
exports.createOpportunity = async (req, res) => {
  const opportunity = new Opportunity(req.body);
  try {
    const newOpportunity = await opportunity.save();
    res.status(201).json(newOpportunity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT update an opportunity
exports.updateOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!opportunity) return res.status(404).json({ message: 'Opportunity not found' });
    res.status(200).json(opportunity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE an opportunity
exports.deleteOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findByIdAndDelete(req.params.id);
    if (!opportunity) return res.status(404).json({ message: 'Opportunity not found' });
    res.status(200).json({ message: 'Opportunity deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
