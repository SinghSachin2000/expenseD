const mongoose = require("mongoose")

const investmentSchema = new mongoose.Schema(
  {

    facility: {
        type:String,
        required:true 
      },
    amountInvest: {
      type: Number,
      required:true
    },

  },
)

module.exports = mongoose.model("Invest", investmentSchema)
