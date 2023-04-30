const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const patientModel = mongoose.Schema({
    patient_code:{
        type: String,
        require: true,
        unique: true,
        dropDups: true
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
        require: true,
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
}, { strict: true });

patientModel.pre('save', function(next) {
    var patient = this;
    bcrypt.hash(patient.password, null, null, function(err, hash) {
        if(err) return next(err);
        patient.password = hash;
        next();
    })
})

module.exports = mongoose.model('Patients', patientModel);