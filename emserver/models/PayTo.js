const mongoose = require("mongoose")

const payToSchema = new mongoose.Schema(
  {
    amountPay: {
      type: Number,
    },
    payto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    payBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  }
)

module.exports = mongoose.model("PayTo", payToSchema)
