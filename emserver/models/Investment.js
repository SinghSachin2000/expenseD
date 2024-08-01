const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema({
  facility: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  investedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Invest", investmentSchema);
