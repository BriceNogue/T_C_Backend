const mongoose = require("mongoose");
const Examination = require("../objects/examination");

const Schema = mongoose.Schema;

const patientCardModel = new Schema(
    {
        patient_card_code: {
            type: String,
            require: true
        },
        patient_card_date: {
            type: Date,
            require: true
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref:'Users',
            require: true
        },
        /*consultation_id: {
            type: Schema.Types.ObjectId,
            ref: 'Consultations'
        },*/
        temperature: {
            type: String,
            require: true
        },
        blood_pressure: {
            type: String,
            require: true
        },
        weight: {
            type: String,
            require: true
        },
        size: {
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
        patient_id: {
            type: Schema.Types.ObjectId,
            ref: 'Patients',
            requir: true
        }

    }, { strict: true }
);


module.exports = mongoose.model("Patient_cards", patientCardModel);