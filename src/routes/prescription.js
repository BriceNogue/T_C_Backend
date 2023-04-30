const express = require("express");
const prescriptionModel = require("../models/prescription");

const router = express.Router();

// create prescription
router.post("/prescription", (req, res) => {
    const prescriptionDate = Date.now();
    const prescription = prescriptionModel(
        {
            prescription_code: req.body.patient_card_code+prescriptionDate,
            prescription_date: prescriptionDate,
            prescription_details: req.body.prescription_details,
            user_code: req.body.user_code,
            user_name: req.body.user_code,
            patient_card_code: req.body.patient_card_code,
            patient_name: req.body.patient_name,
            patient_phone: req.body.patient_phone
        }
    );
    prescription.save().then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }));
});

// get all prescriptions
router.get("/prescriptions", (req, res) => {
    prescriptionModel.find().then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }));
});

// get prescription by id
router.get("/prescriptions/:id", (req, res) => {
    const { id } = req.params;
    prescriptionModel.findById(id).then((data) =>
        res.json(data)).catch((error) => res.json({ message: error }));
})

// update prescription
router.put("/prescription/:id", (req, res) => {
    const { id } = req.params;
    const {
        prescription_code,
        prescription_date,
        prescription_details,
        user_code,
        user_name,
        patient_card_code,
        patient_name,
        patient_phone
    } = req.body;
    prescriptionModel.updateOne({ _id: id }, {
        $set: {
            prescription_code,
            prescription_details,
            user_code,
            user_name,
            patient_card_code,
            patient_name,
            patient_phone
        }
    })
});

// delete prescription
router.delete("/prescription/:id", (req, res) => {
    const { id } = req.params;
    prescriptionModel.deleteOne({ _id: id }).then((data) =>
        res.json(data)).catch((error) =>
            res.json({ message: error }));
})


module.exports = router;