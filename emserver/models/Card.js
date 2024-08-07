const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  group: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
  },
  payTo:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PayTo",
    },
  ],
  investments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invest",
    },
  ],
});

module.exports = mongoose.model("Card", cardSchema);
