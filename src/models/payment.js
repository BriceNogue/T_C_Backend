const mongoose = require("mongoose");

const paymentModel = mongoose.Schema({
    payment_code:{
        type: String,
        require: true
    },
    libele:{
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Payments', paymentModel);