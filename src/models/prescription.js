const mongoose = require("mongoose");

const prescriptionModel = mongoose.Schema({
    prescription_code:{
        type: String,
        require: true
    },
    prescription_date:{
        type: String,
        require: true,
    },
    prescription_details:{
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Prescritions', prescriptionModel);