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
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        require: true
    },
    patient_card_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient_cards',
        require: true
    },
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patients',
        require: true
    }
}, {strict: true});

module.exports = mongoose.model('Prescritions', prescriptionModel);