const mongoose = require("mongoose");

const appointmentModel = mongoose.Schema({
    appointment_code:{
        type: String,
        require: true,
        unique: true,
        dropDups: true
    },
    appointment_date:{
        type: Date,
        require: true
    },
    date_of_appointment:{
        type: Date,
        require: true
    },
    appointment_hour:{
        type: String,
        require: true
    },
    patient_code:{
        type: String,
        require: true
    },
    patient_name: {
        type: String,
        require: true
    },
    patient_phone: {
        type: String
    },
    service_libelle: {
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
    }
}, {strict: true});

module.exports = mongoose.model('Appointments', appointmentModel);