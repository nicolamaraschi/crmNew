const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: String }
});

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  sector: { type: String },
  vatNumber: { type: String },
  employeeCount: { type: Number },
  locations: [LocationSchema], // Array di sub-documenti location
  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }]
});

module.exports = mongoose.model('Company', CompanySchema);
