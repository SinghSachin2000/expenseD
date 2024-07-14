const mongoose =require('mongoose');

const facilitiesExpensesSchema = new mongoose.Schema({
    caardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card',
        required: true,
      },
    name: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
        default: 0,
      },
})
module.exports = mongoose.model('FacilityExpenses',facilitiesExpensesSchema)