const mongoose = require("mongoose");
const paytoSchema = new mongoose.Schema({
    caardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card',
        required: true,
      },
        personId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Person',
          required: true,
        },
        amount: {
          type: Number,
          required: true,
          default: 0,
        },
      
})
module.exports = mongoose.model('PayTo',paytoSchema);