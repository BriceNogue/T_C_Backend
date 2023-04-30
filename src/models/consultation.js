const mongoose = require("mongoose");

const consultationModel = mongoose.Schema({
    consultation_code: {
        type: String,
        require: true,
        unique: true,
        dropDups: true
    },
    user_code: {
        type: String,
        require: true,
    },
    user_name: {
        type: String,
        require: true
    },
    consultation_date: {
        type: Date,
        require: true
    },
    service_libelle: {
        type: String,
        require: true
    },
    consultation_details: {
        type: String,
        require: true
    },
    patient_card_code: {
        type: String,
        require: true
    },
    patient_code: {
        type: String,
        require: false
    },
    patient_name: {
        type: String,
        require: true
    }

}, { strict: true});

module.exports = mongoose.model('Consultations', consultationModel);