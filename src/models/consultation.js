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
        ref: 'Appointments'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        require: true
    },
    consultation_date: {
        type: Date,
        require: true
    },
    service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Services',
        require: true
    },
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patients',
        require: true
    }

}, { strict: true});

module.exports = mongoose.model('Consultations', consultationModel);