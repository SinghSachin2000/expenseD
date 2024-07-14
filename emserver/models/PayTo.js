const mongoose = require("mongoose")

const payToSchema = new mongoose.Schema(
  {
    amountPay: {
      type: Number,
    },
    Payto: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User" 
    },
  },
)

module.exports = mongoose.model("PayTo", payToSchema)
