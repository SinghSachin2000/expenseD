const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Profile",
    },
    token: {
      type: String,
    },
    image: {
      type: String,
    },
    groups:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Group",
        }]
  },
)

module.exports = mongoose.model("User", userSchema)
