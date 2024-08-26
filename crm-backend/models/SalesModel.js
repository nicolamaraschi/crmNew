const mongoose = require('mongoose');

const SalesSchema = new mongoose.Schema({
  opportunityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Opportunity', required: true },  // Reference to Opportunity model
  sale_date: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  payment_status: { type: String, required: true },  // E.g., "Paid", "Pending", "Overdue"
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }  // Reference to User model
}, {
  timestamps: true
});

module.exports = mongoose.model('Sales', SalesSchema);
