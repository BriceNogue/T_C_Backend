const express = require("express");
const consultationModel = require("../models/consultation");
const { route } = require("./user");

const router = express.Router();

// create consultation
router.post("/consultation", (req, res) => {
    const consultationDate = Date.now();
    const consultation = consultationModel(
        {
            consultation_code: consultationDate + req.body.patient_id,
            appointment_id: req.body.appointment_id,
            user_id: req.user_id,
            consultation_date: consultationDate,
            service_id: req.body.service_id,
            patient_id: req.body.patient_id
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
        appointment_id,
        user_id,
        consultation_date,
        service_id,
        patient_id
    } = req.body;
    consultationModel.updateOne({ _id: id }, {
        $set: {
            consultation_code,
            appointment_id,
            user_id,
            consultation_date,
            service_id,
            patient_id
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