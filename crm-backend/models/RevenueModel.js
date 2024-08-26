const mongoose = require('mongoose');

const RevenueSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },  // Reference to Company model
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  amount: { type: Number, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Revenue', RevenueSchema);
