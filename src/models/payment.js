const mongoose = require("mongoose");

const paymentModel = mongoose.Schema({
    payment_code:{
        type: String,
        require: true,
        unique: true,
        dropDups: true
    },
    libele:{
        type: String,
        require: true
    }
}, { strict: true });

module.exports = mongoose.model('Payments', paymentModel);