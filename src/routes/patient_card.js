const express = require("express");
const patientCardModel = require("../models/patient_card");
const { libelle } = require("../objects/examination");
var examination = require("../objects/examination");

const router = express.Router();

// create partient card
router.post("/patient_card", (req, res) => {
    const patientCodeDate = Date.now()
    const patientCard = patientCardModel(
        {
            patient_card_code: "PCC" + req.body.user_name + patientCodeDate + req.body.patient_name,
            patient_card_date: patientCodeDate,
            user_code: req.body.user_code,
            user_name: req.body.user_name,
            consultation_code: req.body.consultation_code,
            consultation_details: req.body.consultation_details,
            examinations: req.body.examinations,
            patient_code: req.body.patient_code,
            patient_name: req.body.patient_name
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
        user_code,
        user_name,
        consultation_code,
        consultation_details,
        examinations,
        patient_code,
        patient_name
    } = req.body;
    patientCardModel.updateOne({ _id: id }, {
        $set: {
            patient_card_code,
            patient_card_date,
            user_code,
            user_name,
            consultation_code,
            consultation_details,
            examinations,
            patient_code,
            patient_name
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
router.put("/card_examination/:id", (req, res) => {
    const { id } = req.params;
    /*const exam = req.body;
    patientCardModel.findById({_id: id}).then((card) => {
        res.json(card);
        console.log(exam);
        card.examinations.push(exam);
        console.log(card.examinations)
    }).catch((error) => res.json({message: error}));*/

    const {
        libelle,
        result
    } = req.body;
    patientCardModel.updateOne({ _id: id }, {
       $push: {
        examinations: {
            libelle,
            result
        }
       }
    }).then((data) => res.json(data)).catch((error) => res.json({ message: error }));

})

module.exports = router;