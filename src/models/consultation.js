const mongoose = require("mongoose");

const consultationModel = mongoose.Schema({
    consultation_code: {
        type: String,
        require: true,
        unique: true,
        dropDups: true
    },
    appointment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'appointments',
        require: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    consultation_date: {
        type: Date,
        require: true
    },
    service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'services',
        require: true
    },
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patients',
        require: true
    }

}, { strict: true});

module.exports = mongoose.model('Consultations', consultationModel);