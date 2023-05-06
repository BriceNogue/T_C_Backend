const express = require("express");
const patientCardModel = require("../models/patient_card");
const { libelle } = require("../objects/examination");
var examination = require("../objects/examination");

const router = express.Router();

// create partient card
router.post("/patient_card", (req, res) => {
    
    const nbrCard = patientCardModel.count();

    const patientCodeDate = Date.now()
    const patientCard = patientCardModel(
        {
            patient_card_code: "TKPCC"+req.body.patient_id,
            patient_card_date: patientCodeDate,
            user_id: req.body.user_id,
            //consultation_id: req.body.consultation_id,
            temperature: req.body.temperature,
            blood_pressure: req.body.blood_pressure,
            weight: req.body.weight,
            size: req.body.size,
            consultation_details: req.body.consultation_details,
            examinations: req.body.examinations,
            patient_id: req.body.patient_id
        }
    );
    patientCard.save().then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }));
});

// get all cards
router.get("/patient_cards", (req, res) => {
    patientCardModel.find().then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }));
});

// get card by id
router.get("/patient_cards/:id", (req, res) => {
    const { id } = req.params;
    patientCardModel.findById({ _id: id }).then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }));
});

// update card
router.put("/patient_cards/:id", (req, res) => {
    const { id } = req.params;
    const {
        patient_card_code,
        patient_card_date,
        user_id,
        //consultation_id,
        temperature,
        blood_pressure,
        weight,
        size,
        consultation_details,
        examinations,
        patient_id
    } = req.body;
    patientCardModel.updateOne({ _id: id }, {
        $set: {
            patient_card_code,
            patient_card_date,
            user_id,
            //consultation_id,
            temperature,
            blood_pressure,
            weight,
            size,
            consultation_details,
            examinations,
            patient_id
        }
    }).then((data) => res.json(data)).catch((error) => res.json({ message: error }));
})

// delete card
router.delete("/patient_card/:id", (req, res) => {
    const { id } = req.params;
    patientCardModel.deleteOne({ _id: id }).then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }));
});

/********************************************* Examinations ******************************************/

// create examination
router.post("/card_examination/:id", (req, res) => {
    const { id } = req.params;
    const examination_code = "EXC" + req.body.libelle + Date.now();
    const {
        libelle,
        P_user_code,
        P_user_name,
        E_user_code,
        E_user_name,
        result
    } = req.body;
    patientCardModel.updateOne({ _id: id }, {
        $push: {
            examinations: {
                examination_code,
                libelle,
                P_user_code,
                P_user_name,
                E_user_code,
                E_user_name,
                result
            }
        }
    }).then((data) => res.json(data)).catch((error) => res.json({ message: error }));

})

module.exports = router;