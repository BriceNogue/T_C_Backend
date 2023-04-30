const mongoose = require("mongoose");
//import Examination from ("../class/examination")

const patientCardModel = mongoose.Schema(
    {
        patient_card_code: {
            type: String,
            require: true,
            unique: true,
            dropDups: true
        },
        patient_card_date: {
            type: Date,
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
        consultation_code: {
            type: String,
        },
        consultation_details: {
            type: String
        },
        examinations: {
            type: [
                {
                    libelle: String,
                    result: String,
                }
            ]
        }

    }
)

module.exports = patientCardModel;