const mongoose = require('mongoose');

const OpportunitySchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },  // Reference to Company model
  stage: { type: String, required: true },  // E.g., "Lead", "Negotiation", "Closed"
  value: { type: Number, required: true },
  creation_date: { type: Date, default: Date.now },
  closure_date: { type: Date },
  assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }  // Reference to User model
}, {
  timestamps: true
});

module.exports = mongoose.model('Opportunity', OpportunitySchema);
