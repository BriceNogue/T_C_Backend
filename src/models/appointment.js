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
    patient_id:{
        type: String,
        require: true
    },
    service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        require: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        require: true
    }
    
}, {strict: true});

module.exports = mongoose.model('Appointments', appointmentModel);