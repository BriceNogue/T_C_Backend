const mongoose = require("mongoose");

const prescriptionModel = mongoose.Schema({
    prescription_code:{
        type: String,
        require: true,
        unique: true,
        dropDups: true,
    },
    prescription_date:{
        type: String,
        require: true,
    },
    prescription_details:{
        type: String,
        require: true
    },
    user_code: {
        type: String,
        require: true
    },
    user_name: {
        type: String,
        require: true
    },
    patient_card_code: {
        type: String,
        require: true
    },
    patient_name: {
        type: String,
        require: true
    },
    patient_phone: {
        type: String,
        require: true
    }
}, {strict: true});

module.exports = mongoose.model('Prescritions', prescriptionModel);