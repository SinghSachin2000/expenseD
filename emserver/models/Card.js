const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  personId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person',
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  payTo: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "PayTo",
  }],
  facilitiesExpenses: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "FacilityExpenses",
   
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Card', cardSchema);
