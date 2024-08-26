const Company = require('../models/companyModel');

// GET all companies
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find().populate('contacts');
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET a single company by ID
exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).populate('contacts');
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST a new company
exports.createCompany = async (req, res) => {
  const company = new Company(req.body); // Assumi che req.body contenga i dati corretti
  try {
    const newCompany = await company.save();
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT update a company
exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a company
exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json({ message: 'Company deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
