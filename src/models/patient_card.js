const mongoose = require("mongoose");
const Examination = require("../objects/examination");

const Schema = mongoose.Schema;

const patientCardModel = new Schema(
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
        /*examinations: {
            type: [
                {
                    libelle: String,
                    result: String,
                }
            ]
        },*/
        examinations: {
            type: [Examination]
        },
        patient_code: {
            type: String,
            requir: true
        },
        patient_name: {
            type: String,
            require: true
        }

    }, { strict: true }
);


module.exports = mongoose.model("Patient_cards", patientCardModel);