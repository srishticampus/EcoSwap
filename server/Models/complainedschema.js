const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  complaintMessage: {
    type: String,
    required: true
  },
  complaintByUserType: {
    type: String,
    enum: ['users', 'organizations'],
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'organizations'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('complaints', complaintSchema);
