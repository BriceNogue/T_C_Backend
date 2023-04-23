const mongoose = require("mongoose");

const consultationModel = mongoose.Schema({
    consultation_code: {
        type: String,
        require: true
    },
    user_id: {
        type: String,
        require: true,
    },
    patient_card_id: {
        type: String,
        require: false
    }

});

module.exports = mongoose.model('Consultations', consultationModel);