const mongoose = require("mongoose");

const paymentModel = mongoose.Schema({
    payment_code:{
        type: String,
        require: true,
    },
    patient_card_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient_cards',
        require: true
    },
    amount_to_be_paid: {
        type: Number,
        require: true
    },
    amount_paid: {
        type: Number,
    },
    payment_date: {
        type: Date,
        require: true
    },
    status: {
        type: String,
    },
    user_id: {
        type: String,
    }
}, { strict: true });

module.exports = mongoose.model('Payments', paymentModel);