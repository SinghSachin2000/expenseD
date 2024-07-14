const mongoose = require("mongoose")

const cardSchema = new mongoose.Schema(
  {
    User: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    payTo: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"PayTo",
    }],
    Investment: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Invest",
    }],
  },
)

module.exports = mongoose.model("Card", cardSchema)
