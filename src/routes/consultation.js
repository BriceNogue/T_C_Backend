const express = require("express");
const consultationModel = require("../models/consultation");
const { route } = require("./user");

const router = express.Router();

// create consultation
router.post("/consultation", (req, res) => {
    const consultationDate = Date.now();
    const consultation = consultationModel(
        {
            consultation_code: consultationDate+req.body.service_libelle,
            user_code: req.user_code,
            user_name: req.user_name,
            consultation_date: consultationDate,
            service_libelle: req.body.service_libelle,
            patient_card_code: req.body.patient_card_code,
            patient_code: req.body.patient_code,
            patient_name: req.body.patient_name
        }
    );
    consultation.save().then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }));
});

// get all consultations
router.get("/consultations", (req, res) => {
    consultationModel.find().then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }));
});

// get consultation by id
router.get("/consultations/:id", (req, res) => {
    const { id } = req.params;
    consultationModel.findById(id).then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }))
});

// update consultation
router.put("/consultation/:id", (req, res) => {
    const { id } = req.params;
    const {
        consultation_code,
        user_code,
        user_name,
        consultation_date,
        service_libelle,
        patient_card_code,
        patient_code,
        patient_name
    } = req.body;
    consultationModel.updateOne({ _id: id }, {
        $set: {
            consultation_code,
            user_code,
            user_name,
            consultation_date,
            service_libelle,
            patient_card_code,
            patient_code,
            patient_name
        }
    }).then((data) => res.json(data)).catch((error) => {
        res.json({ message: error });
    });
})

// delete consultation
router.delete("/consultation/:id", (req, res) => {
    const { id } = req.params;
    consultationModel.deleteOne({ _id: id }).then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }))
});

module.exports = router