const express = require("express");
const prescriptionModel = require("../models/prescription");

const router = express.Router();

// create prescription
router.post("/prescription", (req, res) => {
    const prescription = prescriptionModel(req.body);
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


module.exports = router;