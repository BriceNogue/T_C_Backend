const mongoose = require("mongoose");

const patientModel = mongoose.Schema({
    patient_code:{
        type: String,
        require: true
    },
    first_name:{
        type: String,
        require: true
    },
    last_name:{
        type: String,
        require: true
    },
    address:{
        type: String,
        require: true
    },
    inscription_date:{
        type: Date,
        require: true
    },
    birthday:{
        type: Date,
        require: true
    },
    age:{
        type: String,
        require: true
    },
    gender:{
        type: String,
        require: true
    },
    assurance:{
        type: Boolean,
        require: true
    },
    phone:{
        type: String,
        require: true
    },
    picture:{
        type: String,
        require: false
    },
    marital_status:{
        type: String,
        require: false
    },
    emergency_number:{
        type: String,
        require: false
    },
    occupation:{
        type: String,
        require: false
    },
    password:{
        type: String,
        require: false
    }
});

module.exports = mongoose.model('Patients', patientModel);