const mongoose = require("mongoose")

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    User: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    image: {
      type: String,
    }
  },
)

module.exports = mongoose.model("Member", groupSchema)
